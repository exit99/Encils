import React from 'react';

import TextField from 'material-ui/TextField';

export default ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) => {
  return <TextField {...inputProps} {...props} />
}
