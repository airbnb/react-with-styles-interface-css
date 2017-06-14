import { expect } from 'chai';

import compileCSS from './index';
import expectedCSS from './expectedCSS';

const entryPointFileName = '../utils/entryPoint';

describe('compileCSS', () => {
  test('Return css', () => {
    const CSS = compileCSS(entryPointFileName);
    expect(CSS).to.equal(expectedCSS);
  });
});
