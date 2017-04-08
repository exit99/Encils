import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../layouts/dashboard'
import SidebarButton from '../components/SidebarButton'
import Students from '../components/Students'
import { request } from '../rest'
import filter from 'lodash/filter'

export default class extends React.Component {
  componentWillMount() {
    this.state = {
      classrooms: [],
      selectedClassroom: {},
      students: []
    }

    request("GET", "/classrooms/", null, (data) => {
      if (data) { 
        this.setState({ classrooms: data })
        this.changeClassroom(data[0])();
      }
    });
  }

  changeClassroom(classroom) {
    return () => {
      request("GET", "/students/?classroom=" + classroom.pk.toString(), null, (data) => {
         this.setState({ selectedClassroom: classroom, students: data });
      });
    }
  }

  renderClassroomButton(classroom) {
    const active = classroom.pk == this.state.selectedClassroom.pk;
    return <SidebarButton text={ classroom.name } active={ active } handleClick={ this.changeClassroom(classroom).bind(this) } />
  }

  deleteClassroom(classroom) {
    request("DELETE", `/classrooms/${classroom.pk}/`, null, (data) => { 
      let classrooms = filter(this.state.classrooms, (obj) => { return obj.pk != classroom.pk });
      this.setState({ classrooms: classrooms, selectedClassroom: {} });
    }, null)
  }

  deleteStudent(student) {
    request("DELETE", `/students/${student.pk}/`, null, (data) => { 
      let students = filter(this.state.students, (obj) => { return obj.pk != student.pk });
      this.setState({ students: students });
    }, null)
  }


  render() {
    const { 
      classrooms,
      selectedClassroom,
      students
    } = this.state;

    return (
      <DashboardLayout>
         <div className="row">
            <div className="col s12 m3">
              <div className="card white">
                <div className="card-content">
                  <span className="card-title">Classrooms</span>
                  <br />
                  <center><a onClick={() => Router.push(`/classrooms/create`)} className="btn waves-effect waves-light orange accent-3" style={{ "width": "100%", "font-size": "12px" }}>New Classroom</a></center>
                </div>
                <div className="card-action">
                  { classrooms.map(this.renderClassroomButton.bind(this)) } 
                </div>
              </div>
            </div>

          { assignments.length > 0 ? 
            <div className="col s12 m9">
              <div className="card white">
                <div className="card-content">

                  <div className="row">
                    <div className="col s12 m6">
                      <span className="card-title">{ selectedClassroom.name }</span>
                    </div>
                    <div className="col s12 m6">
                      <div className="row">
                        <div className="col s2 offset-m4">{students.length > 0 ? <center><a onClick={() => Router.push(`/attendance?classroomPk=${selectedClassroom.pk}`)} className="btn-floating waves-effect waves-light orange accent-3 tooltipped" data-position="bottom" data-delay="20" data-tooltip="Take Attendance"><i className="material-icons">person_pin</i></a></center> : null }</div>
                        <div className="col s2"><center><a onClick={() => Router.push(`/students/add?classroomPk=${selectedClassroom.pk}`)} className="btn-floating waves-effect waves-light grey tooltipped" data-position="bottom" data-delay="20" data-tooltip="Add Students"><i className="material-icons">add</i></a></center></div>
                        <div className="col s2"><center><a onClick={() => Router.push(`/classrooms/create?pk=${selectedClassroom.pk}`)} className="btn-floating waves-effect waves-light grey tooltipped" data-position="bottom" data-delay="20" data-tooltip="Edit Classroom"><i className="material-icons">edit</i></a></center></div>
                        <div className="col s2"><center><a onClick={() => this.deleteClassroom(selectedClassroom) }className="btn-floating waves-effect waves-light grey tooltipped" data-position="bottom" data-delay="20" data-tooltip="Delete Classroom"><i className="material-icons">delete</i></a></center></div>
                      </div>
                    </div>
                  </div>

                  <Students students={ students } onDelete={ this.deleteStudent.bind(this) } />

                </div>
              </div>
            </div>
          : null }

          </div>
      </DashboardLayout>
    )
  }
}
