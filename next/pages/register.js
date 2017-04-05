import React from 'react'
import MainLayout from '../layouts/main'
import Form from '../forms/Register'

export default class extends React.Component {
  handleSubmit(e, data) {
    debugger;
  }

  render() {
    return (
      <MainLayout>
        <Form />
      </MainLayout>
    )
  }
}
