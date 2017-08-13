import React from 'react';

import TextField from 'material-ui/TextField';

export default ({ meta: { touched, error } = {}, input: { ...inputProps }, errors, ...props }) => {
  if(errors) {
    const fieldErrors = errors[inputProps.name];
    if (fieldErrors) {
      props.helperText = fieldErrors[0];
      inputProps.error = true;
    }
  }
  return <TextField {...inputProps} {...props} />
}
