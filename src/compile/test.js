import { expect } from 'chai';

import compileCSS from './index';
import expectedCSS from './expectedCSS';

const entryPointFilePath = 'src/utils/entryPoint';

describe('compileCSS', () => {
  test('Return css', () => {
    const CSS = compileCSS(entryPointFilePath);
    expect(CSS).to.equal(expectedCSS);
  });
});
