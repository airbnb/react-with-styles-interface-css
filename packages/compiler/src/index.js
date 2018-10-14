import { resolve } from 'path';

import {
  CSS,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
} from './utils';

// All further imports/requires will be transpiled
// eslint-disable-next-line import/first
import '@babel/register';

function compileCSS(entryPointFilePath) {
  prepareCompilationEnvironment();
  const entryPointFileAbsolutePath = resolve(entryPointFilePath);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(entryPointFileAbsolutePath);
  cleanupCompilationEnvironment();
  return CSS;
}

export default compileCSS;
