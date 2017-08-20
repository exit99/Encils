import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { submit } from 'redux-form'

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let passwordForm = props => {
  const { onSubmit, error, dispatch } = props;

  return (
    <form onSubmit={ onSubmit }>
      <Field
        name="current_password"
        label="Current password"
        type="password"
        component={RenderedInput}
        margin="normal"
        fullWidth={true}
      />
      <br />
      <Field
        name="new_password"
        label="New password"
        type="password"
        component={RenderedInput}
        margin="normal"
        fullWidth={true}
      />
      {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
      <Button raised color="primary" onClick={() => dispatch(submit('passwordForm'))}>Save</Button>
    </form>
  );
}

passwordForm = reduxForm({
  form: 'passwordForm',
})(passwordForm)

export default passwordForm


