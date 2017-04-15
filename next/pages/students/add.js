import React from 'react';
import cookie from 'react-cookie';
import filter from 'lodash/filter';
import Router from 'next/router'
import DisplayLayout from '../../layouts/display';
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
    this.connection = websocket(`/students/${url.query.classroomPk}`, this.addStudent.bind(this), null)
  }   

  addStudent(student) {
    const { students } = this.state;

    console.log(student, students)
    let newStudentArray = filter(students, (s) => { return s.pk != student.pk });
    newStudentArray.push(student);
  
    this.setState({ "students": newStudentArray });
  }

  renderStudent(student) {
    return (
      <div className="col s12 m3">
        <div className="card grey lighten-4" style={ style }>
          <div className="card-content">
            <span className="card-title student-name">{ student.name }</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { students, sms } = this.state;

    return ( 
       <DisplayLayout text={ `Hello Students!  Text your name to ${sms}` } showSpinner={ sms.length === 0 }>
          <div className="row">
            { students.map(this.renderStudent.bind(this)) }
          </div>

          <div className="fixed-action-btn">
            <a className="btn-floating btn-large orange accent-3">
              <i className="large material-icons" onClick={ () => Router.push('/classrooms') }>done</i>
            </a>
          </div>
       </DisplayLayout>
    )
  }
}

