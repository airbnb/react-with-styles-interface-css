import React from 'react';

import withStyles from './withStyles';

export default withStyles(() => ({
  ComponentB_primary: { color: 'green' },
  ComponentB_secondary: { color: 'yellow' },
}))(function ComponentB() {
  return <div />;
});
