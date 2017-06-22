import { writeFile } from 'fs';
import { resolve } from 'path';
import compileCSS from '../compile';

const entryPointFileName = process.argv[2];
const CSS = compileCSS(entryPointFileName);
const format = new CleanCSS({
  level: 0,
  format: 'beautify',
  inline: ['none'],
});
const { styles: formattedCSS } = format.minify(CSS);
writeFile(resolve(stylesheet.css), formattedCSS, (err) => {
  if (err) throw err;
});
