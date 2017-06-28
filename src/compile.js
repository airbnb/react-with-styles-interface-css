import { resolve } from 'path';
import globalCache from 'global-cache';

import { GLOBAL_CACHE_KEY } from './utils/constants';
import {
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
} from './utils/compile';

// All further imports/requires will be transpiled
import 'babel-register';

function compileCSS(entryPointFilePath) {
  prepareCompilationEnvironment();
  const entryPointFileAbsolutePath = resolve(entryPointFilePath);
  require(entryPointFileAbsolutePath);
  const { CSS } = globalCache.get(GLOBAL_CACHE_KEY);
  cleanupCompilationEnvironment();
  return CSS;
}

export default compileCSS;
