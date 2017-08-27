import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let PasswordResetForm = props => {
  const { onSubmit, error } = props;

  return (
    <form onSubmit={ onSubmit }>
      <Field
        name="email"
        label="Email"
        type="email"
        component={RenderedInput}
        margin="normal"
        fullWidth={true}
        errors={error}
      />
      {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
    </form>
  );
}

PasswordResetForm = reduxForm({
  form: 'passwordResetForm',
})(PasswordResetForm)

export default PasswordResetForm


