import { withStyles } from 'react-with-styles';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import CSSInterface from '../src';

ThemedStyleSheet.registerTheme({});
ThemedStyleSheet.registerInterface(CSSInterface);

export default withStyles;
