import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Button';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let StudentForm = props => {
  const { dispatch, onSubmit, error } = props;

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <Field
          name="name"
          label="Name"
          type="text"
          component={RenderedInput}
          margin="normal"
          fullWidth={true}
          errors={error}
        />
        <br />
        <Field
          name="phone"
          label="Phone"
          type="phone"
          component={RenderedInput}
          margin="normal"
          fullWidth={true}
          errors={error}
        />
        {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
      </form>
      <br />
      <Button raised color="accent" onClick={() => dispatch(submit('studentForm'))}>Save</Button>
    </div>
  );
}

StudentForm = reduxForm({
  form: 'studentForm',
})(StudentForm)

export default StudentForm


