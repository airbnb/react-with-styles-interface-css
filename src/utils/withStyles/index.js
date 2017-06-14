import { withStyles, css } from 'react-with-styles';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';

import CSSInterface, { registerCSSInterfaceNamespace } from '../../interface';

ThemedStyleSheet.registerDefaultTheme({});
ThemedStyleSheet.registerInterface(CSSInterface);

const namespace = 'Test';
registerCSSInterfaceNamespace(namespace);

const testStyles = {
  iguana: { color: 'red' },
};
const withTestStyles = withStyles(() => testStyles);

export { withStyles, withTestStyles, css, testStyles, namespace };
