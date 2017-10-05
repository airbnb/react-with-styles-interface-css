import { expect } from 'chai';
import ReactDOM from 'react-dom';
import entries from 'object.entries';
import values from 'object.values';
import toDash from 'dashify';

import CSSInterface from '../../src';
import registerMaxSpecificity from '../../src/utils/registerMaxSpecificity';

import {
  CSS,
  getCSS,
  resetCSS,
  noopReactDOMRender,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
} from '../../src/utils/compile';
import { MAX_SPECIFICITY } from '../../src/utils/constants';

describe('getCSS', () => {
  beforeEach(() => {
    resetCSS();
  });

  it('returns expected styles', () => {
    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    getCSS(stylesObject);

    values(stylesObject).forEach((val) => {
      entries(val).forEach(([styleKey, CSSValue]) => {
        expect(CSS.includes(`${toDash(styleKey)}:${CSSValue}`)).to.equal(true);
      });
    });
  });

  it('returns all expected classes', () => {
    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    getCSS(stylesObject);

    Object.keys(stylesObject).forEach((styleName) => {
      expect(CSS.includes(`.${styleName}`)).to.equal(true);
    });
  });

  it('returns default amount of specifiers', () => {
    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    getCSS(stylesObject);

    // Check all specifiers exist
    Object.keys(stylesObject).forEach((styleName) => {
      for (let i = 1; i <= MAX_SPECIFICITY; i += 1) {
        expect(CSS.includes(`.${styleName}_${i}`.repeat(i))).to.equal(true);
      }
    });
  });

  it('returns custom number of specifiers', () => {
    const maxSpecificity = 5;
    registerMaxSpecificity(maxSpecificity);

    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    getCSS(stylesObject);

    // Check all specifiers exist
    Object.keys(stylesObject).forEach((styleName) => {
      for (let i = 1; i <= maxSpecificity; i += 1) {
        expect(CSS.includes(`.${styleName}_${i}`.repeat(i))).to.equal(true);
      }
    });
  });

  it('returns CSS with custom zero specificity', () => {
    registerMaxSpecificity(0);

    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    getCSS(stylesObject);

    // Check all style names exist
    Object.keys(stylesObject).forEach((styleName) => {
      expect(CSS.includes(styleName)).to.equal(true);
      expect(CSS.includes(`${styleName}_`)).to.equal(false);
    });
  });

  it('addresses pseudo-selectors', () => {
    const maxSpecificity = 2;
    registerMaxSpecificity(2);

    const stylesObject = {
      primary: {
        color: 'red',
        ':hover': {
          color: 'white',
        },
        ':active': {
          color: 'blue',
        },
      },
    };
    getCSS(stylesObject);

    entries(stylesObject).forEach(([styleName, styleDef]) => {
      for (let i = 1; i <= maxSpecificity; i += 1) {
        entries(styleDef).forEach(([styleKey, styleValue]) => {
          if (typeof styleValue === 'object') {
            const className = `.${styleName}_${i}`.repeat(i);
            expect(CSS).to.contain(`${className}${styleKey}`);
          }
        });
      }
    });
  });
});

describe('prepareCompilationEnvironment', () => {
  afterEach(cleanupCompilationEnvironment);

  it('ensures `window` is globally available', () => {
    prepareCompilationEnvironment();
    expect(global.window).not.to.equal(undefined);
  });

  it('ensures `document` is globally available', () => {
    prepareCompilationEnvironment();
    expect(global.document).not.to.equal(undefined);
  });

  it('ensures ReactDOM.render is changed when ReactDOM exists', () => {
    prepareCompilationEnvironment();
    expect(ReactDOM.render).to.equal(noopReactDOMRender);
  });

  it('ensures CSSInterface.create is changed', () => {
    prepareCompilationEnvironment();
    expect(CSSInterface.create.name).to.equal('getCSS');
  });
});

describe('cleanupCompilationEnvironment', () => {
  it('ensures `window` is restored', () => {
    const oldWindow = {};
    global.window = oldWindow;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(global.window).to.equal(oldWindow);
  });

  it('ensures `document` is restored', () => {
    const oldDocument = {};
    global.document = oldDocument;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(global.document).to.equal(oldDocument);
  });

  it('ensures ReactDOM.render is restored when ReactDOM exists', () => {
    const { render: ReactDOMRender } = ReactDOM;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(ReactDOM.render).to.equal(ReactDOMRender);
  });

  it('ensures CSSInterface.create is restored', () => {
    const { create: CSSInterfaceCreate } = CSSInterface;
    prepareCompilationEnvironment();
    cleanupCompilationEnvironment();
    expect(CSSInterface.create).to.equal(CSSInterfaceCreate);
  });
});
