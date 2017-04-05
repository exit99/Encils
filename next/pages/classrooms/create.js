import React from 'react'
import DashboardLayout from '../../layouts/dashboard'
import CardForm from '../../forms/CardForm'
import Router from 'next/router'

export default class extends React.Component {
  onSuccess() {
    Router.push("/classrooms");
  }

  render () { 
    const inputs = [
      { name: "name", type: "text" },
      { name: "school", type: "text" }
    ]

    return (
      <DashboardLayout>
        <CardForm title={ "Create Classroom" } inputs={ inputs } endpoint={ "/classrooms/" } onSuccess={ this.onSuccess } />
      </DashboardLayout>
    )
  }
}
