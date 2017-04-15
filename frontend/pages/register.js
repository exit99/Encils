import React from 'react'
import MainLayout from '../layouts/main'
import CardForm from '../forms/CardForm'
import Router from 'next/router'

export default class extends React.Component {
  onSuccess(data) { 
    Router.push("/login")
  }

  render() {
    const inputs = [
      { name: "email", type: "email" },
      { name: "password", type: "password" }
    ]

    return (
      <MainLayout>
        <CardForm title={ "Register" } inputs={ inputs } endpoint={ "/auth/register/" } onSuccess={ this.onSuccess } />
      </MainLayout>
    )
  }
}
