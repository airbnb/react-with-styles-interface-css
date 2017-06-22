import globalCache from 'global-cache';

import {
  globalKey,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
} from '../utils/compile';

function compileCSS(entryPointFileName) {
  prepareCompilationEnvironment();
  require(`./${entryPointFileName}`);
  const { CSS } = globalCache.get(globalKey);
  cleanupCompilationEnvironment();
  return CSS;
}

export default compileCSS;
