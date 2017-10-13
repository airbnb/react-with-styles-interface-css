import React from 'react';

import withStyles from './withStyles';
import ComponentB from './ComponentB';

export default withStyles(() => ({
  ComponentA_primary: { color: 'red' },
  ComponentA_secondary: { color: 'blue' },
}))(function ComponentA() {
  return (
    <div>
      <ComponentB />
    </div>
  );
});
