import globalCache from 'global-cache';

import {
  globalKey,
  prepareEnvironmentForCompilation,
  cleanupCompilationEnvironment,
} from '../utils/compile';

function compileCSS(entryPointFileName) {
  prepareEnvironmentForCompilation();
  require(`./${entryPointFileName}`);
  const { CSS } = globalCache.get(globalKey);
  cleanupCompilationEnvironment();
  return CSS;
}

export default compileCSS;
