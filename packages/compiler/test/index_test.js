import { expect } from 'chai';

import compileCSS from '../src';
import expectedCSS from './expectedCSS';

const entryPointFilePath = 'test/entryPoint';

describe('compileCSS', () => {
  it('returns css', () => {
    const CSS = compileCSS(entryPointFilePath);
    expect(CSS).to.equal(expectedCSS);
  });
});
