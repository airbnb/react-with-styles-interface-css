/**
 * Require function not parsed by webpack that is suitable for dynamic requiring of files.
 */
function noParseRequire(name) {
  return require(name);
}

export { noParseRequire };
