import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let LoginForm = props => {
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
      />
      <br />
      <Field
        name="password"
        label="Password"
        type="password"
        component={RenderedInput}
        margin="normal"
        fullWidth={true}
      />
      {error && error.non_field_errors ? error.non_field_errors.map((message) => <Message type="error" message={message} />) : null}
    </form>
  );
}

LoginForm = reduxForm({
  form: 'loginForm',
})(LoginForm)

export default LoginForm


