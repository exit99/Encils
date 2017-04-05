import React from 'react'
import MainLayout from '../layouts/main'
import CardForm from '../forms/CardForm'
import Router from 'next/router'
import cookie from 'react-cookie';

export default class extends React.Component {
  onSuccess(data) {
    cookie.save('token', "Token " + data.auth_token, { path: '/' });
    Router.push("/classrooms")
  }

  render() {
    const inputs = [
      { name: "email", type: "email" },
      { name: "password", type: "password" }
    ]

    return (
      <MainLayout>
        <CardForm title={ "Login" } inputs={ inputs } endpoint={ "/auth/login/" } onSuccess={ this.onSuccess } />
      </MainLayout>
    )
  }
}
