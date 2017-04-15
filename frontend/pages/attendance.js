import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../layouts/dashboard'
import { request } from '../rest'
import map from 'lodash/map'
import fromPairs from 'lodash/fromPairs'
import sortBy from 'lodash/sortBy'

export default class extends React.Component {
  componentWillMount() {
    this.state = {
      checked: {},
      students: []
    }

    request("GET", `/students/?classroom=${this.props.url.query.classroomPk}`, null, (data) => {
      let students = sortBy(data, student => student.name)
      let checked = fromPairs(map(students, i => [i.pk, true]));
      this.setState({ students: students, checked: checked });
    });
  }

  saveAttendance() {
    // TODO: Save the attendance.
    Router.push("/classrooms");
  }

  toggleChecked(pk) {
    let checked = this.state.checked;
    checked[pk] = !checked[pk]
    this.setState({ checked: checked });
  }

  renderStudentCheckbox(student) {
    const { checked } = this.state;

    if (checked[student.pk]) {
      return (
        <p>
          <input onClick={() => this.toggleChecked(student.pk)} type="checkbox" id={ student.pk } className="filled-in" checked="checked"/>
          <label onClick={() => this.toggleChecked(student.pk)}>{ student.name }</label>
        </p>
      );
    } else {
      return (
        <p>
          <input onClick={() => this.toggleChecked(student.pk)} type="checkbox" id={ student.pk } checked={ false }/>
          <label onClick={() => this.toggleChecked(student.pk)}>{ student.name }</label>
        </p>
      );
    }
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
      checked,
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
                  <a onClick={ this.saveAttendance.bind(this) } className="btn orange accent-3">Save</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }
}
