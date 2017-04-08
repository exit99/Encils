import React from 'react';
import { Form, Input } from 'formsy-react-components';
import capitalize from 'lodash/capitalize';
import { request } from './../rest';

export default class extends React.Component {
  componentWillMount() {
    this.state = { errors: {}, instance: null };

    const { pk, endpoint } = this.props;

    if (pk) {
      request("GET", this.getEndpoint(), null, (instance) => this.setState({ instance: instance }), null);
    }
  }

  getEndpoint() {
    const { pk, endpoint } = this.props;
    return pk ? `${endpoint}${pk}/` : endpoint;
  }

  handleSubmit(data) {
    const { endpoint, onSuccess, pk } = this.props;
    const method = pk ? "PATCH" : "POST";
    request(method, this.getEndpoint(), data, onSuccess, (errors) => { this.setState({ errors: errors }) });
  }
 
  renderError(field) {
    const { errors } = this.state
    return errors ? <span style={ { color: 'red' } }>{ errors[field] }</span> : null
  }

  renderInput({ name, type }) {
    const { instance } = this.state;
    const value = instance ? instance[name] : undefined;

    return (
      <div>
        {this.renderError(name)}
        <Input type={ type } name={ name } label={ capitalize(name) } value={ value } />
      </div>
    );
  }

  renderTitle(title) {
    return this.props.pk ? `Edit ${title}` : `Create ${title}`; 
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
                            <span className="card-title">{ this.renderTitle(title) }</span>
                                
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
