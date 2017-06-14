/**
 * Construct a class name.
 *
 * namespace {String} Used to construct unique class names.
 * componentName {String} Used to construct unique class names.
 * styleName {String} Name identifying the specific style.
 *
 * Return the class name.
 */
function getClassName(namespace, componentName, styleName) {
  const namespaceSegment = namespace.length > 0 ? `${namespace}__` : '';
  const componentNameSegment = componentName.length > 0 ? `${componentName}--` : '';
  return `${namespaceSegment}${componentNameSegment}${styleName}`;
}

export default getClassName;
