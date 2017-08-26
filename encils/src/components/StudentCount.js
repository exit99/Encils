import React from 'react';
import isUndefined from 'lodash/isUndefined';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PermIdentity from 'material-ui-icons/PermIdentity';

const StudentCount = (props) => {
  const { count, max } = props;

  return (
    <div style={{ color: 'black', paddingRight: 10, paddingLeft: 10 }}>
      <PermIdentity style={{ float: 'left' }}/>
      <Typography style={{ float: 'left' }} type="subheading">{count}{isUndefined(max) ? null : `/${max}`}</Typography>
    </div>
  );
}


export default StudentCount;
