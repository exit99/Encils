import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../layouts/dashboard'
import SidebarButton from '../components/SidebarButton'
import Answers from '../components/Answers'
import { request } from '../rest'
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'

export default class extends React.Component {
  componentWillMount() {
    this.state = {
      classrooms: [],
      selectedClassroom: {},
      students: [],
      assignments: [],
      selectedAssignment: {},
      questions: [],
      answers: []
    }

    request("GET", "/classrooms/", null, (data) => {
      if (data) { 
        this.setState({ classrooms: data })
        this.changeClassroom(data[0])();
      }
    });

    request("GET", "/assignments/", null, (data) => {
      if (data) { 
        this.setState({ assignments: data })
        this.changeAssignment(data[0])();
      }
    });
  }

  onGradeChange(answer, grade) {
    request("PATCH", `/answers/${answer.pk}/`, {grade: grade}, (data) => {
      let targetAnswer = find(this.state.answers, ans => ans.pk === answer.pk);
      targetAnswer.grade = grade;
      this.setState(this.state);
    });
  }

  getAnswers() {
    const { selectedClassroom, selectedAssignment } = this.state;

    if (!isUndefined(selectedClassroom.pk) && !isUndefined(selectedAssignment.pk)) {
      let endpoint = `/answers/?classroom=${selectedClassroom.pk}&assignment=${selectedAssignment.pk}&ordering=question`;
      request("GET", endpoint, null, (data) => {
         this.setState({ answers: data });
      });
    }
  }

  changeClassroom(classroom) {
    return () => {
      request("GET", "/students/?classroom=" + classroom.pk.toString(), null, (data) => {
        this.setState({ selectedClassroom: classroom, students: data });
        this.getAnswers.bind(this)()
      });
    }
  }

  renderClassroomButton(classroom) {
    const active = classroom.pk == this.state.selectedClassroom.pk;
    return <SidebarButton text={ classroom.name } active={ active } handleClick={ this.changeClassroom(classroom).bind(this) } />
  }

  changeAssignment(assignment) {
    return () => {
      request("GET", "/questions/?assignment=" + assignment.pk.toString(), null, (data) => {
        this.setState({ selectedAssignment: assignment, questions: data });
        this.getAnswers.bind(this)()
      });
    }
  }

  renderAssignmentButton(assignment) {
    const active = assignment.pk == this.state.selectedAssignment.pk;
    return <SidebarButton text={ assignment.name } active={ active } handleClick={ this.changeAssignment(assignment).bind(this) } />
  }

  render() {
    const { 
      classrooms,
      selectedClassroom,
      students,
      assignments,
      selectedAssignment,
      questions,
      answers
    } = this.state;

    return (
      <DashboardLayout>
        <div className="row">

          <div className="col s12 m3">
            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Classrooms</span>
                { classrooms.map(this.renderClassroomButton.bind(this)) }
              </div>
            </div>

            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Assignments</span>
                { assignments.map(this.renderAssignmentButton.bind(this)) }
              </div>
            </div>
          </div>

          <div className="col s12 m9">
            <div className="card grey lighten-4">
              <div className="card-content">
                <div className="row">
                  <div className="col s12">
                    <span className="card-title">{ selectedClassroom.name }</span>
                    <i>{ selectedAssignment.name }</i>
                  </div>
                </div>

                <Answers questions={ questions } answers={ answers } onGradeChange={ this.onGradeChange.bind(this) } />

              </div>
            </div>
          </div>

        </div>
      </DashboardLayout>
    )
  }
}
