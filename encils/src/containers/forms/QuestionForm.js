import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';

import Button from 'material-ui/Button';

import Message from '../../components/Message';
import RenderedInput from '../../components/RenderedInput';

let QuestionForm = props => {
  const { dispatch, onSubmit, error } = props;

  return (
    <div style={{padding: 25, marginTop: 25}}>
      <form onSubmit={ onSubmit }>
        <Field
          name="text"
          label="Question"
          type="text"
          component={RenderedInput}
          margin="normal"
          fullWidth={true}
          errors={error}
        />
        {error && error.non_field_errors ? error.non_field_errors.map((message, index) => <Message key={index} type="error" message={message} />) : null}
      </form>
      <br />
      <Button raised color="accent" onClick={() => dispatch(submit('questionForm'))}>Save</Button>
    </div>
  );
}

QuestionForm = reduxForm({
  form: 'questionForm',
})(QuestionForm)

export default QuestionForm


