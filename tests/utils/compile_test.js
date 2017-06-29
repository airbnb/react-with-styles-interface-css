import { expect } from 'chai';
import globalCache from 'global-cache';
import values from 'object.values';
import ReactDOM from 'react-dom';
import CSSInterface from '../../src/interface';

import {
  getCSS,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
  DEFAULT_GLOBAL_VALUE,
} from '../../src/utils/compile';
import { GLOBAL_CACHE_KEY, MAX_SPECIFICITY } from '../../src/utils/constants';

describe('getCSS', () => {
  test('Return CSS', () => {
    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    globalCache.set(GLOBAL_CACHE_KEY, DEFAULT_GLOBAL_VALUE);
    getCSS(stylesObject);
    const { CSS } = globalCache.get(GLOBAL_CACHE_KEY);

    // Check all specifiers exist
    for (let i = 1; i <= MAX_SPECIFICITY; i++) {
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

  test('`window` is globally available', () => {
    prepareCompilationEnvironment();
    expect(global.window).to.not.be.undefined;
  });

  test('`document` is globally available', () => {
    prepareCompilationEnvironment();
    expect(global.document).to.not.be.undefined;
  });

  test('ReactDOM.render is changed when ReactDOM exists', () => {
    prepareCompilationEnvironment();
    expect(ReactDOM.render.name).to.equal('noopReactDOMRender');
  });

  test('CSSInterface.create is changed', () => {
    prepareCompilationEnvironment();
    expect(CSSInterface.create.name).to.equal('getCSS');
  });
});

describe('cleanupCompilationEnvironment', () => {
  test('`window` is restored', () => {
    const oldWindow = {};
    global.window = oldWindow;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(global.window).to.equal(oldWindow);
  });

  test('`document` is restored', () => {
    const oldDocument = {};
    global.document = oldDocument;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(global.document).to.equal(oldDocument);
  });

  test('ReactDOM.render is restored when ReactDOM exists', () => {
    const { render: ReactDOMRender } = ReactDOM;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(ReactDOM.render).to.equal(ReactDOMRender);
  });

  test('CSSInterface.create is restored', () => {
    const { create: CSSInterfaceCreate } = CSSInterface;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(CSSInterface.create).to.equal(CSSInterfaceCreate);
  });
});
