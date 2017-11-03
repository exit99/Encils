import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import mean from 'lodash/mean'
import reduce from 'lodash/reduce';
import round from 'lodash/round'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText, } from 'material-ui/List';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import NothingHere from '../components/NothingHere';
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
  editQuestion,
  deleteQuestion,
} from '../api-client/assignments';
import { getClassrooms } from '../api-client/classrooms';
import { getProfile } from '../api-client/auth';

class Assignment extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      addQuestionsDialogOpen: false,
      updateGradesDialogOpen: false,
      targetQuestion: null,
      isLoading: true,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getAssignment(this.props.match.params.assignmentPk))
      .then(() => {
        dispatch(getClassrooms())
          .then(() => {
            dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk))
              .then(() => this.setState({ isLoading: false }))
          })
          dispatch(getAssignmentAnswers(this.props.match.params.assignmentPk))
        })
  }

  submitQuestionForm(values) {
    const { dispatch, assignment } = this.props;
    const { targetQuestion } = this.state;
    const func = targetQuestion ? editQuestion(targetQuestion.pk) : createQuestion;
    values.assignment = assignment.pk;
    dispatch(func(values)).then((res) => {
      if (!isUndefined(res)) {
        this.setState({addQuestionsDialogOpen: false, targetQuestion: null})
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
    const { assignmentAnswers, classrooms } = this.props;
    if (assignmentAnswers.length > 0) {
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
                  accessor: answer => find(classrooms, (classroom) => answer.classroom === classroom.pk)['name'],
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
    } else {
      return <NothingHere text="No grades for this classroom yet." />
    }
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

  renderClassrooms() {
    const { assignmentAnswers, classrooms, dispatch } = this.props;
    const classroomGrades = reduce(assignmentAnswers, (data, answer) => {
      const classroom = find(classrooms, (classroom) => classroom.pk === answer.classroom);
      data[classroom.name] = {classroomPk: classroom.pk, assignmentPk: answer.assignment};
      return data;
    }, {});

    const listItems = Object.keys(classroomGrades).map((key) => {
      const classroom = classroomGrades[key];
      return <ListItem button key={key}><ListItemText primary={key} onClick={() => dispatch(push(`/grade/${classroom.classroomPk}/${classroom.assignmentPk}`))} /></ListItem>
    });
    return <List>{listItems}</List>
  }

  render() {
    const {
      assignment,
      assignmentQuestions,
      assignmentAnswers,
      profile,
      dispatch,
    } = this.props;
    
    const { 
      addQuestionsDialogOpen,
      updateGradesDialogOpen,
      targetQuestion,
      isLoading,
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

    const tabButtons = assignmentAnswers.length === 0 ? [] : [
      null,
      (<Grid container>
        <Grid item xs={0} sm={6}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button style={{ width: '100%' }} raised color="primary" onClick={() => this.setState({updateGradesDialogOpen: true})}>Edit Grades</Button>
        </Grid>
      </Grid>)

    ]

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
                  buttons={tabButtons}
                  items={[
                    (<SortableList
                      items={assignmentQuestions}
                      isLoading={isLoading}
                      getTitle={(question) => question.text}
                      onLinkClick={(question) => this.setState({ targetQuestion: question })}
                      getSubtitle={(question) => moment(question.created).calendar()}
                      sortFields={['created', 'text', 'grade']}
                      properties={{
                        'Avg. Grade': question => `${question.grade}%`
                      }}
                      nothingText="This quiz has no questions yet."
                      onDelete={this.deleteQuestion.bind(this)}
                      deleteMsg="This will delete all grades for this question and could change student averages."
                    />),
                    this.renderCompletedQuizzes()
                  ]}
                />
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Edit Question" open={targetQuestion} onClose={() => this.setState({targetQuestion: null})}>
            <QuestionForm dispatch={dispatch} onSubmit={this.submitQuestionForm.bind(this)} initialValues={targetQuestion} />
          </FullScreenDialog>

          <FullScreenDialog title="Add Question" open={addQuestionsDialogOpen} onClose={() => this.setState({addQuestionsDialogOpen: false})}>
            <QuestionForm dispatch={dispatch} onSubmit={this.submitQuestionForm.bind(this)} />
          </FullScreenDialog>

          <FullScreenDialog title="Select Classroom" open={updateGradesDialogOpen} onClose={() => this.setState({updateGradesDialogOpen: false})}>
            {this.renderClassrooms()}
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
  classrooms: state.apiReducer.classrooms,
  profile: state.apiReducer.profile,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
