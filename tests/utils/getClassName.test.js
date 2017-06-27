import { expect } from 'chai';

import getClassName from '../../src/utils/getClassName';

const namespace = 'some-project';
const componentName = 'Component';
const styleName = 'primary';

describe('getClassName', () => {
  test('Class name with namespace, component name, and style name', () => {
    const className = getClassName(namespace, componentName, styleName);
    expect(className).to.equal(`${namespace}__${componentName}--${styleName}`);
  });

  test('Class name with namespace and style name', () => {
    const className = getClassName(namespace, '', styleName);
    expect(className).to.equal(`${namespace}__${styleName}`);
  });

  test('Class name with component name and style name', () => {
    const className = getClassName('', componentName, styleName);
    expect(className).to.equal(`${componentName}--${styleName}`);
  });

  test('Class name with style name', () => {
    const className = getClassName('', '', styleName);
    expect(className).to.equal(styleName);
  });
});
