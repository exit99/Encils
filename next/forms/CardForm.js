import React from 'react';
import { Form, Input } from 'formsy-react-components';
import capitalize from 'lodash/capitalize';
import { request } from './../rest';

export default class extends React.Component {
  componentWillMount() {
    this.state = { errors: {} };
  }

  handleSubmit(data) {
    const { endpoint, onSuccess } = this.props;
    request("POST", endpoint, data, onSuccess, (errors) => { this.setState({ errors: errors }) });
  }
 
  renderError(field) {
    const { errors } = this.state
    return errors ? <span style={ { color: 'red' } }>{ errors[field] }</span> : null
  }

  renderInput({ name, type }) {
    return (
      <div>
        {this.renderError(name)}
        <Input type={ type } name={ name } label={ capitalize(name) } />
      </div>
    );
  }

  render() {
    const { title, inputs } = this.props;
    return (
      <div className="container">
          <div className="row">
              <div className="col sm12 m8 offset-m2">
                  <div className="card grey lighten-4">
                      <div className="card-content">
                          <Form onSubmit={this.handleSubmit.bind(this)}>
                            <span className="card-title">{ title }</span>
                                
                            { inputs.map(this.renderInput.bind(this)) }
                            { this.renderError('non_field_errors') }
      
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
