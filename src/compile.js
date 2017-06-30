import { resolve } from 'path';

import {
  CSS,
  prepareCompilationEnvironment,
  cleanupCompilationEnvironment,
} from './utils/compile';

// All further imports/requires will be transpiled
import 'babel-register';

function compileCSS(entryPointFilePath) {
  prepareCompilationEnvironment();
  const entryPointFileAbsolutePath = resolve(entryPointFilePath);
  require(entryPointFileAbsolutePath);
  cleanupCompilationEnvironment();
  return CSS;
}

export default compileCSS;
