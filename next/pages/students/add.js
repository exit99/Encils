import React from 'react';
import DisplayLayout from '../../layouts/display';
import cookie from 'react-cookie';
import { request, websocket } from '../../rest';

const style = { "overflow": "hidden" }

export default class extends React.Component {

  componentWillMount() {
    this.state = {
      "students": [],
      "sms": ""
    }

    request("GET", "/auth/me/", null, (data) => this.setState({ "sms": data.sms }), null);
  }

  componentDidMount() {
    const { url } = this.props;
    this.connection = websocket(`/students/${url.query.classroomPk}`, (data) => { debugger }, null)
  }   

  renderStudent(student) {
    return (
        <div className="row">
          <div id="student-12" className="col s12 m3">
            <div className="card grey lighten-4" style={ style }>
              <div className="card-content">
                <span className="card-title student-name">{ student.name }</span>
              </div>
            </div>
          </div>
        </div>
      )
  }

  render() {
    const { students, sms } = this.state;

    return ( 
       <DisplayLayout text={ `Hello Students!  Text your name to ${sms}` } showSpinner={ sms.length === 0 }>
         { students.map(this.renderStudent.bind(this)) }
       </DisplayLayout>
    )
  }
}

