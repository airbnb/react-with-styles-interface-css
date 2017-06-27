import { expect } from 'chai';
import entries from 'object.entries';

import CSSInterface from 'react-with-styles-interface-css';
import getClassName from '../utils/getClassName';
import { testStyles, namespace } from '../utils/withStyles';

const { create, resolve } = CSSInterface;

describe('create', () => {
  test('Return an object mapping style names to class names', () => {
    const stylesToClasses = create(testStyles, '');
    const { length: testStylesLength } = Object.keys(testStyles);
    const { length: stylesToClassesLength } = Object.keys(stylesToClasses);

    expect(stylesToClassesLength).to.equal(testStylesLength);

    entries(stylesToClasses).forEach(([styleName, className]) => {
      const expectedClassName = getClassName(namespace, '', styleName);
      expect(className).to.equal(expectedClassName);
    });
  });

  test('Use component name in class name', () => {
    const componentName = 'Component';
    const stylesToClasses = create(testStyles, componentName);
    const { length: testStylesLength } = Object.keys(testStyles);
    const { length: stylesToClassesLength } = Object.keys(stylesToClasses);

    expect(stylesToClassesLength).to.equal(testStylesLength);

    entries(stylesToClasses).forEach(([styleName, className]) => {
      const expectedClassName = getClassName(namespace, componentName, styleName);
      expect(className).to.equal(expectedClassName);
    });
  });
});

describe('resolve', () => {
  test('Accept array of class names and inline style objects', () => {
    const result = resolve([
      'a',
      'b',
      'c',
      { color: 'orange', width: '10px' },
      { color: 'red', height: '5px' },
    ]);
    expect(result).to.have.property('className');
    expect(result).to.have.property('style');
  });

  test('Accept array of arrays of class names and inline style objects', () => {
    const result = resolve([
      ['a', 'b', 'c'],
      [{ color: 'orange', width: '10px' }, { color: 'red', height: '5px' }],
    ]);
    expect(result).to.have.property('className');
    expect(result).to.have.property('style');
  });

  test('Return style and className props with position suffixes', () => {
    const { className, style } = resolve([
      'a',
      'b',
      'c',
      { color: 'orange', width: '10px' },
      { color: 'red', height: '5px' },
    ]);
    expect(className).to.equal('a a_1 b b_2 c c_3');
    expect(style).to.deep.equal({ color: 'red', width: '10px', height: '5px' });
  });
});

describe('registerCSSInterfaceNamespace', () => {
  test('Register namespace with the interface', () => {
    const stylesToClasses = create(testStyles, '');
    expect(stylesToClasses.iguana).to.equal('Test__iguana');
  });
});
