import React from 'react'
import DashboardLayout from '../../layouts/dashboard'
import ModelCardForm from '../../forms/ModelCardForm'
import Router from 'next/router'

export default class extends React.Component {
  onSuccess() {
    Router.push("/assignments");
  }

  render () { 
    const inputs = [
      { name: "assignment", type: "hidden", value: this.props.url.query.assignmentPk },
      { name: "text", type: "text", label: "Question" },
    ];
    const pk = this.props.url.query.pk;    
    const endpoint = "/questions/"
    const title = "Question"

    return (
      <DashboardLayout>
        <ModelCardForm title={ title } pk={ pk } inputs={ inputs } endpoint={ endpoint } onSuccess={ this.onSuccess } />
      </DashboardLayout>
    )
  }
}
