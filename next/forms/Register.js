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
    if (!data.email) { 
      this.setState({ errors: { email: "This field may not be blank" }})
    } else {
      request("POST", "/auth/register/", data, () => { Router.push("/login") }, (errors) => { this.setState({ errors: errors }) });
    }
  }

  renderError(field) {
    const { errors } = this.state
    return errors ? <span style={ { color: 'red' } }>{ errors[field] }</span> : null
  }

  render() {
    return (
      <CardForm handleSubmit={this.handleSubmit.bind(this)} sizeClass={ "col sm12 m8 offset-m2" } title={ "Register" }>
        {this.renderError('email')}
        <Input type="email" name="email" label="Email" />
        {this.renderError('password')}
        <Input type="password" name="password" label="Password" />
        {this.renderError('non_field_errors')}
      </CardForm>
    );
  }
};
