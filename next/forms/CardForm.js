import React from 'react'
import { Form, Input } from 'formsy-react-components';

export default class extends React.Component {
  render() {
    const { sizeClass, title, children, handleSubmit } = this.props;

    return (
      <div className="container">
          <div className="row">
              <div className={ sizeClass }>
                  <div className="card grey lighten-4">
                      <div className="card-content">
                          <Form onSubmit={handleSubmit}>
                            <span className="card-title">{ title }</span>
                                
                            { children }
      
                            <div className="card-action">
                                <center>
                                  <button type="submit" className="btn waves-effect waves-light">Submit</button>
                                </center>
                            </div>
                          </Form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
