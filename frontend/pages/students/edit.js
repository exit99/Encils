import React from 'react'
import DashboardLayout from '../../layouts/dashboard'
import ModelCardForm from '../../forms/ModelCardForm'
import Router from 'next/router'

export default class extends React.Component {
  onSuccess() {
    Router.push("/classrooms");
  }

  render () { 
    const inputs = [
      { name: "name", type: "text" },
      { name: "phone", type: "text" }
    ];
    const pk = this.props.url.query.pk;    
    const endpoint = "/students/"
    const title = "Student"

    return (
      <DashboardLayout>
        <ModelCardForm title={ title } pk={ pk } inputs={ inputs } endpoint={ endpoint } onSuccess={ this.onSuccess } />
      </DashboardLayout>
    )
  }
}