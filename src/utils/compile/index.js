import { JSDOM } from 'jsdom';
import values from 'object.values';
import globalCache from 'global-cache';
import { StyleSheetServer, StyleSheet, css as compile } from 'aphrodite/no-important';

import shared from '../../shared';
import CSSInterface from 'react-with-styles-interface-css';
import getClassName from '../getClassName';

const globalKey = 'reactWithStylesInterfaceCSS';
const defaultGlobalValue = { CSS: '' };
const MAX_SPECIFICITY = 20;

let ReactDOM;
let hasReactDOM = false;
try {
  ReactDOM = require('react-dom');
  hasReactDOM = true;
} catch(err) {}

let oldWindow;
let oldDocument;
let oldReactDOMRender;
let oldGlobalState;
let oldCSSInterfaceCreate;

function getCSS(stylesObject, componentName = '') {
  const styleSheet = StyleSheet.create(stylesObject);
  Object.keys(styleSheet).forEach((styleName) => {
    const styleSheetObject = styleSheet[styleName];
    const className = getClassName(shared.namespace, componentName, styleName);
    styleSheetObject._name = className;
    for (let i = 1; i <= MAX_SPECIFICITY; i++) {
      const nextClassName = `.${className}_${i}`.repeat(i).slice(1);
      styleSheet[nextClassName] = { ...styleSheetObject, _name: nextClassName };
    }
  });
  const { css: CSSInfo } = StyleSheetServer.renderStatic(() => {
    values(styleSheet).forEach((style) => {
      compile(style);
    });
  });
  const { content: CSS } = CSSInfo;

  globalCache.get(globalKey).CSS = CSS;
}

function prepareEnvironmentForCompilation() {
  const { window: jsdomWindow } = new JSDOM();
  const { document: jsdomDocument } = jsdomWindow;

  oldWindow = global.window;
  global.window = jsdomWindow;
  oldDocument = global.document;
  global.document = jsdomDocument;

  oldGlobalState = globalCache.get(globalKey);
  globalCache.set(globalKey, defaultGlobalValue);

  if (hasReactDOM) {
    oldReactDOMRender = ReactDOM.render;
    ReactDOM.render = function noopReactDOMRender() {};
  }

  oldCSSInterfaceCreate = CSSInterface.create;
  CSSInterface.create = getCSS;
}

function cleanupCompilationEnvironment() {
  global.window = oldWindow;
  global.document = oldDocument;
  globalCache.set(globalKey, oldGlobalState);
  if (hasReactDOM) ReactDOM.render = oldReactDOMRender;
  CSSInterface.create = oldCSSInterfaceCreate;
}

export {
  globalKey,
  defaultGlobalValue,
  getCSS,
  prepareEnvironmentForCompilation,
  cleanupCompilationEnvironment,
};
