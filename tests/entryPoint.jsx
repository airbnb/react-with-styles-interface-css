import React from 'react';
import ReactDOM from 'react-dom';

import withStyles from './withStyles';
import ComponentA from './ComponentA';

const EntryPoint = withStyles(() => ({
  EntryPoint_primary: { color: 'black' },
  EntryPoint_secondary: { color: 'white' },
}))(function EntryPoint() {
  return (
    <div>
      <ComponentA />
    </div>
  );
});

ReactDOM.render(<EntryPoint />, document.getElementById('root'));
