import React from 'react'
import Router from 'next/router'
import DashboardLayout from '../layouts/dashboard'
import SidebarButton from '../components/SidebarButton'
import Questions from '../components/Questions'
import { request } from '../rest'
import filter from 'lodash/filter'
import ReactTooltip from 'react-tooltip'

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
        const pk = this.props.url.query.pk;
        const assignment = pk ? filter(data, (assignment) => assignment.pk == pk)[0] : data[0];
        this.changeAssignment(assignment)();
      }
    });
  }

  changeAssignment(assignment) {
    return () => {
      request("GET", "/questions/?assignment=" + assignment.pk.toString(), null, (data) => {
         this.setState({ selectedAssignment: assignment, questions: data });
      });
    }
  }

  renderAssignmentButton(assignment) {
    const active = assignment.pk == this.state.selectedAssignment.pk;
    return <SidebarButton text={ assignment.name } active={ active } handleClick={ this.changeAssignment(assignment).bind(this) } />
  }

  deleteAssignment(assignment) {
    request("DELETE", `/assignments/${assignment.pk}/`, null, (data) => { 
      let assignments = filter(this.state.assignments, (obj) => { return obj.pk != assignment.pk });
      this.setState({ assignments: assignments });
      if (assignments.length > 0) {
        this.changeAssignment(assignments[0])()
      }
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
            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Assignments</span>
                <br />
                <center><a onClick={() => Router.push(`/assignments/create`)} className="btn waves-effect waves-light " style={ {width: "100%", fontSize: "12px" } }>New Assignment</a></center>
              </div>
              <div className="card-action">
                { assignments.map(this.renderAssignmentButton.bind(this)) } 
              </div>
            </div>
          </div>

          { assignments.length > 0 ? 
          <div className="col s12 m9">
            <div className="card grey lighten-4">
              <div className="card-content">

                <div className="row">
                  <div className="col s12 m6">
                    <span className="card-title">{ selectedAssignment.name }</span>
                  </div>
                  <div className="col s12 m6">
                    <div className="row">
                      <div className="col s2 offset-s6"><center><a onClick={() => Router.push(`/questions/create?assignmentPk=${selectedAssignment.pk}`)} className="btn-floating waves-effect waves-light grey" data-tip="Add Question"><i className="material-icons">add</i></a></center></div>
                      <div className="col s2"><center><a onClick={() => Router.push(`/assignments/create?pk=${selectedAssignment.pk}`)} className="btn-floating waves-effect waves-light grey" data-tip="Edit Assignment"><i className="material-icons">edit</i></a></center></div>
                      <div className="col s2"><center><a onClick={() => this.deleteAssignment(selectedAssignment)} className="btn-floating waves-effect waves-light grey" data-tip="Delete Assignment"><i className="material-icons">delete</i></a></center></div>
                      <ReactTooltip place="bottom" type="dark" effect="solid" wrapper="body"/>
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
