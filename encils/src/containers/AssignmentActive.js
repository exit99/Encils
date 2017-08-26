import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import filter from 'lodash/filter';
import isUndefined from 'lodash/isUndefined';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightIcon from 'material-ui-icons/KeyboardArrowRight';

import StillThereDialog from '../components/StillThereDialog';
import StudentCount from '../components/StudentCount';

import phoneFormatter from 'phone-formatter';
import ReactInterval from 'react-interval';

import balloons from '../images/hot-air-balloon.jpeg'

import { gradientBackground, onDesktop, requestLimit } from '../utils';

import { getProfile } from '../api-client/auth';
import { getClassroom, getClassroomStudents } from '../api-client/classrooms';
import { editActiveItem } from '../api-client/activeItems';
import { 
  getAssignment,
  getAssignments,
  getAssignmentQuestions,
  getQuestionAnswers,
  resetQuestionAnswers,
} from '../api-client/assignments';

const style = {
  backgroundImage: `url('${balloons}')`,
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
}

const waitingStyle = {
  position: 'fixed',
  bottom: '1em',
  left: '1em',
  width: '20em'
};

class AssignmentActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingOnIndex: -1,
      requestCount: 0,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    resetQuestionAnswers(dispatch);
    dispatch(getProfile());
    dispatch(getAssignment(this.props.match.params.assignmentPk));
    dispatch(getClassroomStudents(this.props.match.params.classroomPk));
    dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk))
      .then((questions) => {
        dispatch(getClassroom(this.props.match.params.classroomPk))
          .then((classroom) => {
              const questionPk = questions[this.props.match.params.questionIndex].pk;
              dispatch(editActiveItem({classroom: classroom.pk, question: questionPk}));
          });
      });
  }

  updateWaitingOnIndex() {
    const { waitingOnIndex } = this.state;
    const students = this.unAnsweredStudents();
    const index = waitingOnIndex >= students.length - 1 ? 0 : waitingOnIndex + 1;
    this.setState({ waitingOnIndex: index });
  }

  unAnsweredStudents() {
    const { questionAnswers, classroomStudents } = this.props;
    const answeredPks = questionAnswers.map((ans) => ans.student.pk);
    return filter(classroomStudents, (s) => answeredPks.indexOf(s.pk) === -1);
  }

  getAnswers() {
    const { dispatch, assignmentQuestions } = this.props;
    const { requestCount } = this.state;
    if (assignmentQuestions.length && requestCount < requestLimit ) {
      const questionPk = assignmentQuestions[this.props.match.params.questionIndex].pk;
      dispatch(getQuestionAnswers(questionPk));
      this.setState({ requestCount: requestCount + 1 });
    }
  }

  renderWaitingOnName() {
    const { waitingOnIndex } = this.state;
    const students = this.unAnsweredStudents();
    const student = students[waitingOnIndex];
    if (!isUndefined(student)) {
      return student.name;
    }
  }

  finish() { 
    const { dispatch } = this.props
    dispatch(editActiveItem({classroom: null, question: null}))
      .then(() => dispatch(push('/classrooms')));
  }

  newQuestion(index) {
    const { dispatch, classroom, assignment, assignmentQuestions } = this.props;
    dispatch(editActiveItem({classroom: classroom.pk, question: assignmentQuestions[index].pk}))
      .then(() => {
        dispatch(push(`/assignment-active/${classroom.pk}/${assignment.pk}/${index}`));
        this.setState({ requestCount: 0 });
      });
  }

  renderAnswer(answer, index) {
    return (
      <Grid key={index} item xs={12} sm={6} md={3} lg={3} xl={2}>
        <Card>
          <CardContent>
            <Typography type="headline">{answer.student.name}</Typography>
            <Typography type="subheading" style={{paddingTop: 5}}>{answer.text}</Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  render() {
    const { 
      classroom,
      classroomStudents, 
      assignment,
      assignmentQuestions,
      profile,
      questionAnswers,
      dispatch,
    } = this.props;
    const { requestCount } = this.state;

    const questionIndex = parseInt(this.props.match.params.questionIndex)
    const question = assignmentQuestions && assignmentQuestions[questionIndex];

    return (
      <div style={style}>
        <AppBar position="static" style={gradientBackground}>
          <Toolbar>
            <Typography type='headline' style={{flex: 1}}>
              { question ? question.text : 'Loading...' }
            </Typography>
            <StudentCount count={questionAnswers.length} max={classroomStudents.length} />
            <Button disabled={questionIndex === 0} onClick={() => this.newQuestion(questionIndex - 1)}><LeftIcon />Previous</Button>
            <Typography style={{padding: 10}}>{questionIndex+1} of {assignmentQuestions.length}</Typography>
            {questionIndex === assignmentQuestions.length - 1 ?
              <Button onClick={this.finish.bind(this)}>Done</Button> :
              <Button onClick={() => this.newQuestion(questionIndex + 1)}>Next<RightIcon /></Button>
            }
          </Toolbar>
        </AppBar>

        <div style={{padding: 25}}>
          <Grid container direction='row' justify='flex-start'>
            {questionAnswers.map(this.renderAnswer)} 
          </Grid>
        </div>

        <div style={waitingStyle}>
          <Card>
            <CardContent>
              <Typography type='subheading'>Text answers to: {profile.sms && phoneFormatter.format(profile.sms, "(NNN) NNN-NNNN")}</Typography>
              <Typography>Waiting on...</Typography>
              <Typography type="headline">{this.renderWaitingOnName()}</Typography>
              <ReactInterval timeout={1000} enabled={true} callback={this.updateWaitingOnIndex.bind(this)} />
              <ReactInterval timeout={3000} enabled={true} callback={this.getAnswers.bind(this)} />
            </CardContent>
          </Card>
        </div>

        <StillThereDialog open={requestCount >= requestLimit} onClose={() => this.setState({ requestCount: 0 })} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignment: state.apiReducer.assignment,
  assignmentQuestions: state.apiReducer.assignmentQuestions,
  classroom: state.apiReducer.classroom,
  classroomStudents: state.apiReducer.classroomStudents,
  profile: state.apiReducer.profile,
  questionAnswers: state.apiReducer.questionAnswers,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentActive)
