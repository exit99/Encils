import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../layouts/dashboard'
import SidebarButton from '../components/SidebarButton'
import Questions from '../components/Questions'
import { request } from '../rest'
import filter from 'lodash/filter'

export default class extends React.Component {
  componentWillMount() {
    this.state = {
      assignments: [],
      selectedAssignment: {},
      questions: []
    }

    request("GET", "/assignments/", null, (data) => {
      if (data) { 
        this.setState({ assignments: data })
        this.changeAssignment(data[0])();
      }
    });
  }

  changeAssignment(assignment) {
    return () => {
      request("GET", "/questions/?assignment=" + assignment.pk.toString(), null, (data) => {
         this.setState({ selectedAssignment: classroom, questions: data });
      });
    }
  }

  renderAssignmentButton(assignment) {
    const active = assignment.pk == this.state.selectedAssignment.pk;
    return <SidebarButton text={ assignment.name } active={ active } handleClick={ this.changeAssignment(assignment).bind(this) } />
  }

  deleteAssignment(assignment) {
    request("DELETE", `/assignment/${assignment.pk}/`, null, (data) => { 
      let assignments = filter(this.state.assignments, (obj) => { return obj.pk != assignment.pk });
      this.setState({ classrooms: classrooms, selectedClassroom: {} });
    }, null)
  }

  deleteQuestion(question) {
    request("DELETE", `/questions/${question.pk}/`, null, (data) => { 
      let questions = filter(this.state.questions, (obj) => { return obj.pk != question.pk });
      this.setState({ questions: questions });
    }, null)
  }


  render() {
    const { 
      assignments,
      selectedAssignment,
      questions
    } = this.state;

    return (
      <DashboardLayout>
        <div className="row">
          <div className="col s12 m3">
            <div className="card white">
              <div className="card-content">
                <span className="card-title">Assignments</span>
                <br />
                <center><a onClick={() => Router.push(`/assignments/create`)} className="btn waves-effect waves-light orange accent-3" style={ {width: "100%", fontSize: "12px" } }>New Assignment</a></center>
              </div>
              <div className="card-action">
                { assignments.map(this.renderAssignmentButton.bind(this)) } 
              </div>
            </div>
          </div>

          { assignments.length > 0 ? 
          <div className="col s12 m9">
            <div className="card white">
              <div className="card-content">

                <div className="row">
                  <div className="col s12 m6">
                    <span className="card-title">{ selectedAssignment.name }</span>
                  </div>
                  <div className="col s12 m6">
                    <div className="row">
                      <div className="col s2 offset-m4">{ questions.length > 0 ? <center><a className="btn-floating waves-effect waves-light grey tooltipped orange accent-3" data-position="bottom" data-delay="20" data-tooltip="Start Assignment"><i className="material-icons">assignment</i></a></center> : null }</div>
                      <div className="col s2"><center><a onClick={() => Router.push(`/questions/add?assignmentPk=${selectedAssignment.pk}`)} className="btn-floating waves-effect waves-light grey tooltipped" data-position="bottom" data-delay="20" data-tooltip="Add Question"><i className="material-icons">add</i></a></center></div>
                      <div className="col s2"><center><a onClick={() => Router.push(`/assignments/create?pk=${selectedAssignment.pk}`)} className="btn-floating waves-effect waves-light grey tooltipped" data-position="bottom" data-delay="20" data-tooltip="Edit Assignment" href="#editclassNameroomModal"><i className="material-icons">edit</i></a></center></div>
                      <div className="col s2"><center><a onClick={() => this.deleteAssignment(selectedAssignment)} className="btn-floating waves-effect waves-light grey tooltipped" data-position="bottom" data-delay="20" data-tooltip="Delete Assignment" href="#deleteModal"><i className="material-icons">delete</i></a></center></div>
                    </div>
                  </div>
                </div>

                <Questions questions={ questions } onDelete={ this.deleteQuestion.bind(this) } />

              </div>
            </div>
          </div>
          : null }

        </div>
      </DashboardLayout>
    )
  }
}
