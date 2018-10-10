import { writeFile } from 'fs';
import { resolve } from 'path';
import CleanCSS from 'clean-css';

import compileCSS from '.';

const entryPointFilePath = process.argv[2];
const CSS = compileCSS(entryPointFilePath);
const format = new CleanCSS({
  level: 0,
  format: 'beautify',
  inline: ['none'],
});
const { styles: formattedCSS } = format.minify(CSS);
writeFile(resolve('stylesheet.css'), formattedCSS, (err) => {
  if (err) throw err;
});
