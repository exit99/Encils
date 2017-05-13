import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../../layouts/dashboard'
import SidebarButton from '../../components/SidebarButton'
import { request } from '../../rest'
import isEmpty from 'lodash/isEmpty'

export default class extends React.Component {
  componentWillMount() {
    this.state = {
      classrooms: [],
      selectedClassroom: {},
      assignments: [],
      selectedAssignment: {},
    }

    request("GET", "/classrooms/", null, (data) => {
      if (data) { 
        this.setState({ classrooms: data })
      }
    });

    request("GET", "/assignments/", null, (data) => {
      if (data) { 
        this.setState({ assignments: data })
      }
    });
  }

  changeClassroom(classroom) {
    return () => this.setState({ selectedClassroom: classroom });
  }

  renderClassroom(classroom) {
    const active = classroom.pk == this.state.selectedClassroom.pk;
    return <SidebarButton text={ classroom.name } active={ active } handleClick={ this.changeClassroom(classroom).bind(this) } />
  }

  changeAssignment(assignment) {
    return () => this.setState({ selectedAssignment: assignment });
  }

  renderAssignment(assignment) {
    const active = assignment.pk == this.state.selectedAssignment.pk;
    return <SidebarButton text={ assignment.name } active={ active } handleClick={ this.changeAssignment(assignment).bind(this) } />
  }

  renderStartButton() {
    const { 
      selectedClassroom,
      selectedAssignment
    } = this.state;

    let className = "btn  right";
    let handleClick = () => Router.push(`/assignments/take?classroomPk=${selectedClassroom.pk}&assignmentPk=${selectedAssignment.pk}&questionIndex=0`)
    if (isEmpty(selectedClassroom) || isEmpty(selectedAssignment)) {
      className = `${className} disabled`;
      handleClick = () => null;
    }

    return <a onClick={handleClick} className={className} style={{ 'fontSize': '1rem' }}>Start Assignment</a>
  }

  render() {
    const { 
      classrooms,
      assignments,
    } = this.state;

    return (
      <DashboardLayout>

        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Give assignment to classroom {this.renderStartButton.bind(this)()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col m6">
            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Select Classroom</span>
                {classrooms.map(this.renderClassroom.bind(this))}
              </div>
            </div>
          </div>

          <div className="col m6">
            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Select Assignment</span>
                {assignments.map(this.renderAssignment.bind(this))}
              </div>
            </div>
          </div>

        </div>
      </DashboardLayout>
    )
  }
}
