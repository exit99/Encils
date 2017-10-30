import React from 'react';
import isUndefined from 'lodash/isUndefined';

import Typography from 'material-ui/Typography';
import PermIdentity from 'material-ui-icons/PermIdentity';

const StudentCount = (props) => {
  const { count, max } = props;

  return (
    <div style={{ color: 'white', paddingRight: 10, paddingLeft: 10 }}>
      <PermIdentity style={{ float: 'left', color: 'white' }}/>
      <Typography style={{ float: 'left', color: 'white' }} type="subheading">{count}{isUndefined(max) ? null : `/${max}`}</Typography>
    </div>
  );
}


export default StudentCount;
