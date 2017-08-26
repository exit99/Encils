import React from 'react';

import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

export default ({ meta: { touched, error } = {}, input: { ...inputProps }, errors, ...props }) => {
  if(errors) {
    const fieldErrors = errors[inputProps.name];
    if (fieldErrors) {
      props.helperText = fieldErrors[0];
      inputProps.error = true;
    }
  }
  if(props.type === 'checkbox') {
    return (
      <FormControlLabel
        control={<Checkbox {...inputProps} {...props} />}
        label={props.label}
      />
    );
  } else {
    return <TextField {...inputProps} {...props} />
  }
}
