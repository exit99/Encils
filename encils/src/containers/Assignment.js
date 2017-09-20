import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import mean from 'lodash/mean'
import round from 'lodash/round'
import moment from 'moment';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import CreateIcon from 'material-ui-icons/Create';
import SMSIcon from 'material-ui-icons/Sms';
import { grey } from 'material-ui/colors';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import Message from '../components/Message';
import SortableList from './SortableList';
import Tabs from '../components/Tabs';

import Dashboard from './Dashboard';
import QuestionForm from './forms/QuestionForm';

import { 
  getAssignment,
  getAssignmentQuestions,
  getAssignmentAnswers,
  editAssignment,
  createQuestion,
  deleteQuestion,
} from '../api-client/assignments';

import { getProfile } from '../api-client/auth';

class Assignment extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      addQuestionsDialogOpen: false,
    }
  }

  componentWillMount() {
    const { dispatch, assignment } = this.props;
    dispatch(getAssignment(this.props.match.params.assignmentPk))
      .then(() => {
        dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk))
        dispatch(getAssignmentAnswers(this.props.match.params.assignmentPk))
      });
  }

  submitQuestionForm(values) {
    const { dispatch, assignment } = this.props;
    values.assignment = assignment.pk;

    dispatch(createQuestion(values)).then((res) => {
      if (!isUndefined(res)) {
        this.setState({addQuestionsDialogOpen: false});
        dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk));
        dispatch(getProfile());
      };
    });
  }

  deleteQuestion(pk) {
    const { dispatch } = this.props;
    dispatch(deleteQuestion(pk))
      .then(() => {
        dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk))
      });
  }

  renderCompletedQuizzes() {
    const { assignmentAnswers } = this.props;
    return (
      <ReactTable
        data={assignmentAnswers}
        columns={[
          {
            Header: "Grades",
            columns: [
              {
                Header: "Classroom",
                id: "classroom",
                accessor: answer => answer.classroom.name,
              },

              {
                Header: "Student",
                id: "student",
                accessor: answer => answer.student.name,
              },
            ]
          },
          {
            columns: [
              {
                Header: "Question",
                id: "question",
                accessor: answer => answer.question.text,
              },
              {
                Header: "Grade",
                accessor: "grade",
                Cell: row => `${row.value}%`,
                Footer: (
                    <span>
                      <strong>Average:</strong>{" "}
                      {round(mean(assignmentAnswers.map(d => d.grade)))}%
                    </span>
                  )
              }
            ]
          }
        ]}
        pivotBy={["classroom", "student"]}
        defaultPageSize={assignmentAnswers.length}
        className="-striped -highlight"
      />
    );
  }

  toggleHideAnswers(field) {
    const { dispatch } = this.props;
    let assignment = this.props.assignment;
    assignment.hide_answers = !assignment.hide_answers;
    dispatch(editAssignment(assignment.pk)(assignment));
  }

  toggleOneTime(field) {
    const { dispatch } = this.props;
    let assignment = this.props.assignment;
    assignment.one_at_a_time = !assignment.one_at_a_time;
    dispatch(editAssignment(assignment.pk)(assignment));
  }

  render() {
    const {
      assignment,
      assignmentQuestions,
      profile,
      dispatch,
    } = this.props;
    
    const { 
      addQuestionsDialogOpen,
    } = this.state;

    const switches = [
      {
        label: "Hide answers",
        checked: assignment.hide_answers,
        onClick: this.toggleHideAnswers.bind(this)
      },
      {
        label: "Show one",
        checked: assignment.one_at_a_time,
        onClick: this.toggleOneTime.bind(this)
      }
    ];
    
    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header 
              text={assignment.name} buttonText="Add Question" 
              onClick={() => this.setState({ addQuestionsDialogOpen: true })}
              pointer={profile.pointer_step === 'question'}
              switches={switches} />
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  titles={['Questions', 'Completed Quizzes']}
                  items={[
                    (<SortableList
                      items={assignmentQuestions}
                      getTitle={(question) => question.text}
                      getSubtitle={(question) => moment(question.created).calendar()}
                      sortFields={['created', 'text', 'grade']}
                      properties={{
                        'Avg. Grade': question => `${question.grade}%`
                      }}
                      nothingText="You have no questions in this quiz yet."
                      onDelete={this.deleteQuestion.bind(this)}
                      deleteMsg="This will delete all grades for this question and could change student averages."
                      disabledLink={true}
                    />),
                    this.renderCompletedQuizzes()
                  ]}
                />
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Add Question" open={addQuestionsDialogOpen} onClose={() => this.setState({addQuestionsDialogOpen: false})}>
            <QuestionForm dispatch={dispatch} onSubmit={this.submitQuestionForm.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignment: state.apiReducer.assignment,
  assignmentQuestions: state.apiReducer.assignmentQuestions,
  assignmentAnswers: state.apiReducer.assignmentAnswers,
  profile: state.apiReducer.profile,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
