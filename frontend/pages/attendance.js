import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../layouts/dashboard'
import { request } from '../rest'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'

export default class extends React.Component {
  componentWillMount() {
    this.state = {
      students: [],
      attendance: []
    }

    request("GET", `/students/?classroom=${this.props.url.query.classroomPk}`, null, (data) => {
      let students = sortBy(data, student => student.name);
      this.setState({ students: students });
    });
    request("GET", `/attendance/${this.props.url.query.classroomPk}/today/`, null, (data) => {
      this.setState({ attendance: data });
    });
  }

  updateAttendance(pk, status) {
    request("PATCH", `/attendance/${pk}/`, { status: status }, (data) => {
      let targetAttendance = find(this.state.attendance, a => a.pk === data.pk);
      targetAttendance.status = status;
      this.setState(this.state);
    });
  }

  renderStudentCheckbox(student) {
    const { attendance } = this.state;
    const studentAttendance = filter(attendance, a => a.student === student.pk)[0];
    if (isUndefined(studentAttendance)) { return null; }
    const status = studentAttendance.status === "present" ? "absent" : "present";
    const handleClick = () => this.updateAttendance(studentAttendance.pk, status);
    const checked = studentAttendance.status === "present";
    const className = studentAttendance.status === "present" ? "filled-in" : "";

    return (
      <p>
        <input onClick={handleClick.bind(this)} type="checkbox" id={ student.pk } className={className} checked={ checked }/>
        <label onClick={handleClick.bind(this)}>{ student.name }</label>
      </p>
    );
  }

  renderDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd } 
    if(mm<10) { mm='0'+mm } 
    return `${mm}/${dd}/${yyyy}`;
  }

  render() {
    const { 
      attendance,
      students
    } = this.state;

    return (
      <DashboardLayout>
        <div className="row">
          <div className="col s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title">Attendance for: { this.renderDate() }</span>
                <p>Uncheck students who are absent.</p>
                <br />
                { students.map(this.renderStudentCheckbox.bind(this)) }
                <br />
                <div className="card-action">
                  <a onClick={ () => Router.push('/classrooms') } className="btn orange accent-3">Save</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }
}
