import React from 'react'
import {Fieldset, Field, createValue} from 'react-forms'
import CardForm from './CardForm'
import { Input } from 'formsy-react-components';
import { request } from '../rest'
import Router from 'next/router'


export default class extends React.Component {
  componentWillMount() {
    this.state = { errors: {} };
  }
  
  handleSubmit(data) {
    request("POST", "/classrooms/", data, () => { Router.push("/classrooms") }, (errors) => { this.setState({ errors: errors }) });
  }

  renderError(field) {
    const { errors } = this.state
    return errors ? <span style={ { color: 'red' } }>{ errors[field] }</span> : null
  }

  render() {
    return (
      <CardForm handleSubmit={this.handleSubmit.bind(this)} sizeClass={ "col sm12 m8 offset-m2" } title={ "Create Classroom" }>
        {this.renderError('name')}
        <Input type="text" name="name" label="Name" />
        {this.renderError('school')}
        <Input type="text" name="school" label="School" />
        {this.renderError('non_field_errors')}
      </CardForm>
    );
  }
};
