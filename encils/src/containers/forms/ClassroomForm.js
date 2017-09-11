import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Button';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let ClassroomForm = props => {
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
          name="school"
          label="School"
          type="text"
          component={RenderedInput}
          margin="normal"
          fullWidth={true}
          errors={error}
        />
        {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
      </form>
      <br />
      <Button raised color="primary" onClick={() => dispatch(submit('classroomForm'))}>Save</Button>
    </div>
  );
}

ClassroomForm = reduxForm({
  form: 'classroomForm',
})(ClassroomForm)

export default ClassroomForm


