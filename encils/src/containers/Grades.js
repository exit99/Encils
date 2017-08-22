import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import filter from 'lodash/filter';
import isUndefined from 'lodash/isUndefined';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import LeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightIcon from 'material-ui-icons/KeyboardArrowRight';
import { grey } from 'material-ui/colors';

import AnswerTable from '../components/AnswerTable';
import SelectList from '../components/SelectList';

import Dashboard from './Dashboard';

import { 
  getClassroom,
  getClassrooms,
} from '../api-client/classrooms';

import { 
  getAssignment,
  getAssignments,
  getAssignmentQuestions,
  getQuestionAnswers,
  editQuestionAnswer,
} from '../api-client/assignments';

class Grades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getAssignments())
    dispatch(getClassrooms())
      .then((classrooms) => {
        if (classrooms && classrooms.length > 0) {
          this.getClassroom(classrooms[0]);
        }
      });
  }

  getClassroom({ pk }) {
    const { dispatch } = this.props;
    dispatch(getClassroom(pk))
      .then((classroom) => {
        if (classroom.assignments_given.length > 0) {
          this.getAssignment({pk: classroom.assignments_given[0]});
        }
      });
  }

  getAssignment({ pk }) {
    const { dispatch } = this.props;
    this.setState({ questionIndex: 0 });
    dispatch(getAssignment(pk));
    dispatch(getAssignmentQuestions(pk))
      .then((questions) => {
        this.getQuestionAnswers(questions[0]);
      });
  }

  getQuestionAnswers({ pk }) {
    const { dispatch } = this.props;
    dispatch(getQuestionAnswers(pk));
  }

  getCompletedClassroomAssignments() {
    const { classroom, assignments } = this.props;
    return filter(assignments, (assignment) => {
      return classroom.assignments_given && classroom.assignments_given.indexOf(assignment.pk) > -1
    });
  }

  updateGrade(answer_pk, value) {
    const { dispatch } = this.props;
    dispatch(editQuestionAnswer(answer_pk)({ grade: value })); 
  }

  newQuestion(index) {
    const { assignmentQuestions } = this.props;
    const questionIndex = this.setState({ questionIndex: index });
    this.getQuestionAnswers(assignmentQuestions[index]);
  }

  render() {
    const {
      assignment,
      assignments,
      assignmentQuestions,
      classroom,
      classrooms,
      questionAnswers, 
      dispatch,
    } = this.props;

    const questionIndex = parseInt(this.state.questionIndex);

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Grid container>
              <Grid item md={3} sm={12} xs={12}>
                <Card style={{background: grey[100]}}>
                  <CardContent>
                    <SelectList 
                      title="Classroom"
                      items={filter(classrooms, (classroom) => classroom.assignments_given && classroom.assignments_given.length > 0)}
                      selected={classroom}
                      primaryField="name"
                      onClick={this.getClassroom.bind(this)} />
                    <br />
                    <SelectList 
                      title="Assignments"
                      items={this.getCompletedClassroomAssignments.bind(this)()}
                      selected={assignment}
                      primaryField="name"
                      onClick={this.getAssignment.bind(this)} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={9} sm={12} xs={12}>
                <AppBar position="static">
                   <Toolbar>
                     <Typography type="title" color="inherit" style={{flex: 1}}>
                       {classroom.name}{classroom.assignments_given && classroom.assignments_given.length > 0 ? `: ${assignment.name}`: null}
                     </Typography>
                   </Toolbar>
                 </AppBar>
                <br />
                <AppBar position="static">
                  <Toolbar>
                    <Typography style={{color: 'white', flex: 1}}>{isUndefined(assignmentQuestions[questionIndex]) ? 'Loading...' : assignmentQuestions[questionIndex].text}</Typography>
                    {questionIndex === 0 ? null : <Button onClick={() => this.newQuestion(questionIndex - 1)} style={{color: 'white'}}><LeftIcon />Previous</Button>}
                    {questionIndex === assignmentQuestions.length - 1 ? null : <Button onClick={() => this.newQuestion(questionIndex + 1)} style={{color: 'white'}}>Next<RightIcon /></Button>}
                  </Toolbar>
                </AppBar>
                 <Card style={{background: grey[100]}}>
                  <CardContent>
                    <AnswerTable answers={questionAnswers} onGradeChange={this.updateGrade.bind(this)} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignment: state.apiReducer.assignment,
  assignments: state.apiReducer.assignments,
  assignmentQuestions: state.apiReducer.assignmentQuestions,
  classroom: state.apiReducer.classroom,
  classrooms: state.apiReducer.classrooms,
  questionAnswers: state.apiReducer.questionAnswers,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Grades)
