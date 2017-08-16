import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let RegistrationForm = props => {
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
      <br />
      <Field
        name="password"
        label="Password"
        type="password"
        component={RenderedInput}
        margin="normal"
        fullWidth={true}
        errors={error}
      />
      <br />
      <Field
        name="password_confirm"
        label="Confirm Password"
        type="password"
        component={RenderedInput}
        margin="normal"
        fullWidth={true}
        errors={error}
      />
      {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
    </form>
  );
}

RegistrationForm = reduxForm({
  form: 'registrationForm',
})(RegistrationForm)

export default RegistrationForm


