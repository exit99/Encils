import React from 'react'
import {Fieldset, Field, createValue} from 'react-forms'
import CardForm from './CardForm'
import { Input } from 'formsy-react-components';
import { request } from '../rest'
import Router from 'next/router'
import cookie from 'react-cookie';


export default class extends React.Component {
  componentWillMount() {
    this.state = { errors: {} };
  }
  
  handleSubmit(data) {
    if (!data.email) { 
      this.setState({ errors: { email: "This field may not be blank" }})
    } else {
      request("POST", "/auth/login/", data, (data) => { 
        cookie.save('token', "Token " + data.auth_token, { path: '/' });
        Router.push("/classrooms")
      }, (errors) => { this.setState({ errors: errors }) });
    }
  }

  renderError(field) {
    const { errors } = this.state
    return errors ? <span style={ { color: 'red' } }>{ errors[field] }</span> : null
  }

  render() {
    console.log(this.state.errors)
    return (
      <CardForm handleSubmit={this.handleSubmit.bind(this)} sizeClass={ "col sm12 m8 offset-m2" } title={ "Login" }>
        {this.renderError('email')}
        <Input type="email" name="email" label="Email" />
        {this.renderError('password')}
        <Input type="password" name="password" label="Password" />
        {this.renderError('non_field_errors')}
      </CardForm>
    );
  }
};
