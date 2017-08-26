import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Button';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let AssignmentForm = props => {
  const { dispatch, onSubmit, error } = props;

  return (
    <div style={{padding: 25, marginTop: 25}}>
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
        <Field
          name="hide_answers"
          label="Hide answers."
          type="checkbox"
          component={RenderedInput}
          margin="normal"
          fullWidth={true}
          errors={error}
        />
        <Field
          name="one_at_a_time"
          label="Show one answer at a time."
          type="checkbox"
          component={RenderedInput}
          margin="normal"
          fullWidth={true}
          errors={error}
        />
        {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
      </form>
      <br />
      <Button raised color="primary" onClick={() => dispatch(submit('assignmentForm'))}>Save</Button>
    </div>
  );
}

AssignmentForm = reduxForm({
  form: 'assignmentForm',
})(AssignmentForm)

export default AssignmentForm


