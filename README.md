# react-with-styles-interface-css

Interface for [react-with-styles](https://www.npmjs.com/package/react-with-styles) that compiles CSS-in-js styles to static CSS classes with deterministic and human-friendly class names whose styles can be easily overridden.

## Usage

### Interface

A [react-with-styles](https://www.npmjs.com/package/react-with-styles) interface which is to be used along with [react-with-styles](https://www.npmjs.com/package/react-with-styles).

```javascript
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import CSSInterface, { registerCSSInterfaceNamespace } from 'react-with-styles-interface-css';

ThemedStyleSheet.registerInterface(CSSInterface);

// Optional: Prefix all class names in the output with 'MyPackageName__'
const namespace = 'MyPackageName';
registerCSSInterfaceNamespace(namespace);
```

### Compile

The styles passed to `withStyles` in the source code are compiled to static CSS by the `compileCSS` function shown below. For convenience, a CLI wrapping `compileCSS` is provided.

#### Compile via CLI

Compile styles to CSS using the `compile-css` CLI.
- Expects a relative or absolute path to the entry point source file of a React application
- Automatically compiles the source file and its imported dependencies on the fly using the babel configuration present in the project if one exists
- Outputs a `stylesheet.css` file containing the compiled CSS in the current working directory

##### Run the CLI via npm script (preferred):

```json
{
  "scripts": {
    "build:css": "compile-css src/App.jsx"
  }
}
```
```
npm run build:css
```

##### Run the CLI directly:

```sh
./node_modules/.bin/compile-css src/App.jsx
```

#### Compile via library function

```javascript
import compileCSS from 'react-with-styles-interface-css/compile';

const entryPointFilePath = 'src/App.jsx';
// CSS is the minified CSS output
const CSS = compileCSS(entryPointFilePath);
```
