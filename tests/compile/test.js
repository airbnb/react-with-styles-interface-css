import { expect } from 'chai';

import compileCSS from '../../src/compile';
import expectedCSS from './expectedCSS';

const entryPointFilePath = 'tests/entryPoint';

describe('compileCSS', () => {
  it('returns css', () => {
    const CSS = compileCSS(entryPointFilePath);
    expect(CSS).to.equal(expectedCSS);
  });
});
