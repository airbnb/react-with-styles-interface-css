import { JSDOM } from 'jsdom';
import values from 'object.values';
import entries from 'object.entries';
import globalCache from 'global-cache';
import arrayFrom from 'array-from';
import { StyleSheetServer, StyleSheet, css as compile } from 'aphrodite/no-important';

import CSSInterface from 'react-with-styles-interface-css';
import { GLOBAL_CACHE_KEY, MAX_SPECIFICITY } from 'react-with-styles-interface-css/dist/utils/constants';
import getClassName from 'react-with-styles-interface-css/dist/utils/getClassName';

// eslint-disable-next-line import/no-mutable-exports
let CSS = '';

let ReactDOM;
let ReactDOMServer;
let hasReactDOM = false;
try {
  ReactDOM = require('react-dom'); // eslint-disable-line global-require
  ReactDOMServer = require('react-dom/server'); // eslint-disable-line global-require
  hasReactDOM = true;
} catch (err) {} // eslint-disable-line no-empty


let oldWindow;
let oldDocument;
let oldReactDOMRender;
let oldCSSInterfaceCreate;

function resetCSS() {
  CSS = '';
}

function getCSS(stylesObject) {
  const sharedState = globalCache.get(GLOBAL_CACHE_KEY) || {};
  const { namespace = '', maxSpecificity = MAX_SPECIFICITY } = sharedState;

  const stylesObjectWithSpecificity = { ...stylesObject };
  entries(stylesObject).forEach(([styleName, styleDef]) => {
    for (let i = 1; i <= maxSpecificity; i += 1) {
      const repeatedSpecifier =
        arrayFrom({ length: i }, () => `${styleName}_${i}`).join('.');
      stylesObjectWithSpecificity[repeatedSpecifier] = styleDef;
    }
  });

  const styleSheet = StyleSheet.create(stylesObjectWithSpecificity);
  entries(styleSheet).forEach(([styleName, styleSheetObject]) => {
    // getClassName removes the aphrodite hash, creating a clean classname
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    styleSheetObject._name = getClassName(namespace, styleName);
  });

  const { css: CSSInfo } = StyleSheetServer.renderStatic(() => {
    values(styleSheet).forEach((style) => {
      compile(style);
    });
  });
  const { content: newCSS } = CSSInfo;

  // Prepend newCSS so the entry point styles appear at the top of the stylesheet
  CSS = newCSS + CSS;
  return {};
}

function prepareCompilationEnvironment() {
  const { window: jsdomWindow } = new JSDOM();
  const { document: jsdomDocument } = jsdomWindow;

  oldWindow = global.window;
  global.window = jsdomWindow;
  oldDocument = global.document;
  global.document = jsdomDocument;

  if (hasReactDOM) {
    oldReactDOMRender = ReactDOM.render;
    ReactDOM.render = ReactDOMServer.renderToString;
  }

  oldCSSInterfaceCreate = CSSInterface.create;
  CSSInterface.create = getCSS;
}

function cleanupCompilationEnvironment() {
  global.window = oldWindow;
  global.document = oldDocument;
  if (hasReactDOM) ReactDOM.render = oldReactDOMRender;
  CSSInterface.create = oldCSSInterfaceCreate;
}

export {
  CSS,
  getCSS,
  resetCSS,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
};
