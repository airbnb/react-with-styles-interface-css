import { expect } from 'chai';
import values from 'object.values';
import ReactDOM from 'react-dom';
import CSSInterface from '../../src/interface';

import {
  CSS,
  getCSS,
  noopReactDOMRender,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
} from '../../src/utils/compile';
import { MAX_SPECIFICITY } from '../../src/utils/constants';

describe('getCSS', () => {
  it('Return CSS', () => {
    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    getCSS(stylesObject);

    // Check all specifiers exist
    for (let i = 1; i <= MAX_SPECIFICITY; i += 1) {
      Object.keys(stylesObject).forEach((styleName) => {
        expect(CSS.includes(`.${styleName}_${i}`.repeat(i))).to.equal(true);
      });
    }

    // Check all CSS values exist
    values(values(stylesObject)).forEach((CSSValue) => {
      expect(CSS.includes(CSSValue));
    });
  });
});

describe('prepareCompilationEnvironment', () => {
  afterEach(cleanupCompilationEnvironment);

  it('`window` is globally available', () => {
    prepareCompilationEnvironment();
    expect(global.window).not.to.equal(undefined);
  });

  it('`document` is globally available', () => {
    prepareCompilationEnvironment();
    expect(global.document).not.to.equal(undefined);
  });

  it('ReactDOM.render is changed when ReactDOM exists', () => {
    prepareCompilationEnvironment();
    expect(ReactDOM.render).to.equal(noopReactDOMRender);
  });

  it('CSSInterface.create is changed', () => {
    prepareCompilationEnvironment();
    expect(CSSInterface.create.name).to.equal('getCSS');
  });
});

describe('cleanupCompilationEnvironment', () => {
  it('`window` is restored', () => {
    const oldWindow = {};
    global.window = oldWindow;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(global.window).to.equal(oldWindow);
  });

  it('`document` is restored', () => {
    const oldDocument = {};
    global.document = oldDocument;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(global.document).to.equal(oldDocument);
  });

  it('ReactDOM.render is restored when ReactDOM exists', () => {
    const { render: ReactDOMRender } = ReactDOM;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(ReactDOM.render).to.equal(ReactDOMRender);
  });

  it('CSSInterface.create is restored', () => {
    const { create: CSSInterfaceCreate } = CSSInterface;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(CSSInterface.create).to.equal(CSSInterfaceCreate);
  });
});
