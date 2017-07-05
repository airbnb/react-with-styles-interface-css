import { JSDOM } from 'jsdom';
import values from 'object.values';
import entries from 'object.entries';
import globalCache from 'global-cache';
import { StyleSheetServer, StyleSheet, css as compile } from 'aphrodite/no-important';

import CSSInterface from '..';
import { GLOBAL_CACHE_KEY, MAX_SPECIFICITY } from './constants';
import getClassName from './getClassName';

// eslint-disable-next-line import/no-mutable-exports
let CSS = '';

let ReactDOM;
let hasReactDOM = false;
try {
  // eslint-disable-next-line global-require
  ReactDOM = require('react-dom');
  hasReactDOM = true;
} catch (err) {} // eslint-disable-line no-empty

let oldWindow;
let oldDocument;
let oldReactDOMRender;
let oldCSSInterfaceCreate;

function getCSS(stylesObject) {
  const sharedState = globalCache.get(GLOBAL_CACHE_KEY) || {};

  const styleSheet = StyleSheet.create(stylesObject);
  entries(styleSheet).forEach(([styleName, styleSheetObject]) => {
    const { namespace = '' } = sharedState;
    const className = getClassName(namespace, styleName);

    let extendedClassName = `${className}`;
    for (let i = 1; i <= MAX_SPECIFICITY; i += 1) {
      const repeatedSpecifier = `.${className}_${i}`.repeat(i);
      extendedClassName += `,${repeatedSpecifier}`;
    }
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    styleSheetObject._name = extendedClassName;
  });
  const { css: CSSInfo } = StyleSheetServer.renderStatic(() => {
    values(styleSheet).forEach((style) => {
      compile(style);
    });
  });
  const { content: newCSS } = CSSInfo;

  // Prepend newCSS so the entry point styles appear at the top of the stylesheet
  CSS = newCSS + CSS;
}

function noopReactDOMRender() {}

function prepareCompilationEnvironment() {
  const { window: jsdomWindow } = new JSDOM();
  const { document: jsdomDocument } = jsdomWindow;

  oldWindow = global.window;
  global.window = jsdomWindow;
  oldDocument = global.document;
  global.document = jsdomDocument;

  if (hasReactDOM) {
    oldReactDOMRender = ReactDOM.render;
    ReactDOM.render = noopReactDOMRender;
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
  noopReactDOMRender,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
};
