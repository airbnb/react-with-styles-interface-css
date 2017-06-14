import React from 'react';
import ReactDOM from 'react-dom';

import { withStyles } from './withStyles';
import ComponentA from './ComponentA';

const EntryPoint = withStyles(() => ({
  ComponentA_primary: { color: 'red' },
  ComponentA_secondary: { color: 'blue' },
}))(function EntryPoint() {
  return (
    <div>
      <ComponentA />
    </div>
  );
});

ReactDOM.render(<EntryPoint />, document.getElementById('root'));
