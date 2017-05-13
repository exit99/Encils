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
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="col sm12 m8 offset-m2">
                    <div className="card grey lighten-4">
                        <div className="card-content">
                          <span className="card-title">Register</span>
                          Encils is currently in Alpha testing.  If you are interested in being an alpha tester, please:
                          <p>Email: <b>Kazanski.zachary@gmail.com</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </MainLayout>
    )

//return (
//      <MainLayout>
//        <CardForm title={ "Register" } inputs={ inputs } endpoint={ "/auth/register/" } onSuccess={ this.onSuccess } />
//      </MainLayout>
//    )
  }
}
