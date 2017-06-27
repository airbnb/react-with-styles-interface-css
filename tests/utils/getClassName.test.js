import { expect } from 'chai';

import getClassName from '../../src/utils/getClassName';

const namespace = 'some-project';
const styleName = 'primary';

describe('getClassName', () => {
  test('Class name with namespace and style name', () => {
    const className = getClassName(namespace, styleName);
    expect(className).to.equal(`${namespace}__${styleName}`);
  });

  test('Class name with style name', () => {
    const className = getClassName('', styleName);
    expect(className).to.equal(styleName);
  });
});
