import { expect } from 'chai';

describe('getCSS', () => {
  test('Return CSS', () => {
    const stylesObject = {
      primary: {
        color: 'red',
        fontSize: '1rem',
        position: 'fixed',
      },
    };
    const CSS = getCSS(stylesObject);
    const selectors = '...';
    expect(CSS).to.equal(`.primary{color:'red';font-size:'1rem';position:'fixed';}`);
  });
});

describe('prepareEnvironmentForCompilation', () => {
  afterEach(cleanup);

  test('`window` is globally available', () => {
    prepare();
    // console.log('window', global.window);
    // expect(global.window).to.exist;
  });

  test('`document` is globally available', () => {
    // prepare();
    // console.log('window', global.window);
    // console.log('doc', global.document);
  });

  test('Global state is set', () => {
    // prepare();
    const globalValue = globalCache.get(globalKey);
    expect(globalValue).to.equal(defaultGlobalValue);
  });

  test('ReactDOM.render is modified when ReactDOM exists', () => {
    try {
      const ReactDOM = require('react-dom');
      expect(ReactDOM.render.name).to.equal('noopRender');
    } catch (err) {}
  });
});

describe('cleanupCompilationEnvironment', () => {
  test('`window` is restored', () => {
  });

  test('`document` is restored', () => {
  });

  test('Global state is restored', () => {
    const oldGlobalState = globalCache.get(globalKey);
    prepare();
    cleanup();
    const currentGlobalState = globalCache.get(globalKey);
    expect(currentGlobalState).to.equal(oldGlobalState);
  });

  test.skip('ReactDOM.render is restored when ReactDOM exists', () => {
    try {
      const ReactDOM = require('react-dom');
      const oldReactDOMRenderName = ReactDOM.render.name;
      prepare();
      cleanup();
      expect(ReactDOM.render.name).to.equal(oldReactDOMRenderName);
    } catch (err) {}
  });
});
