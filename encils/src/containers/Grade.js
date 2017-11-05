import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';

import Header from '../components/Header';
import SortableList from './SortableList';
import Dashboard from './Dashboard';

import { 
  getAnswers,
  getAssignment,
  editQuestionAnswer,
} from '../api-client/assignments';

import { 
  getClassroom,
} from '../api-client/classrooms';

class Grade extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        grades: {},
        isLoading: true,
      }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getAnswers(
      this.props.match.params.classroomPk,
      this.props.match.params.assignmentPk,
    )).then((answers) => {
      const grades = answers.reduce(function(obj, x) { 
        obj[x.pk] = x.grade;
        return obj;
      }, {});
      this.setState({ grades, isLoading: false });
    });
    dispatch(getAssignment(this.props.match.params.assignmentPk));
    dispatch(getClassroom(this.props.match.params.classroomPk));
  }

  updateGrade(answerPk) {
    const { dispatch } = this.props;
    const { grades } = this.state;
    return (event) => {
      const value = event.target.value;

      let newGrades = Object.assign({}, grades);
      newGrades[answerPk] = value;
      this.setState({ grades: newGrades });

      dispatch(editQuestionAnswer(answerPk)({ grade: value }));
    }
  }

  copyGrade(answer) {
    const { answers, dispatch } = this.props;
    const { grades } = this.state;

    let newGrades = Object.assign({}, grades);
    const answerTargets = filter(answers, (ans) => {
      return ans.text === answer.text && ans.questionPk === answer.questionPk && ans.pk !== answer.pk
    });
    answerTargets.map(ans => newGrades[ans.pk] = answer.grade);
    this.setState({ grades: newGrades });

    answerTargets.map(ans => dispatch(editQuestionAnswer(ans.pk)({ grade: answer.grade })));
  }

  groupedAnswers() {
    const { answers } = this.props;
    const { grades } = this.state;
    console.log("grouped", this.state.grades);
    const groupedAnswers = groupBy(answers, (answer) => answer.question.pk)
    const groupedValues = Object.values(groupedAnswers);
    return groupedValues.map((ans) => {
      return (
        <div>
          <Typography type="title">{ans[0].question.text}</Typography>
          <br />
          <SortableList 
            items={ans}
            getSubtitle={(answer) => answer.text}
            getTitle={(answer) => answer.student.name}
            properties={{
            '': (answer) => (
              <div>
                <TextField
                  type="number"
                  value={grades[answer.pk]}
                  onChange={this.updateGrade(answer.pk)}
                  inputProps={{
                    'min': '0',
                    'max': '100',
                  }}
                  style={{ display: 'inline', fontSize: 20 }}
                />
                <span style={{ display: 'inline' }}>%</span>
                {false ?
                <span style={{ display: 'inline', marginLeft: 5, marginBottom: -5 }}><CircularProgress size={25} /></span>
                : null}
              </div>
            ),
            ' ': (answer) => (<Tooltip title="Copy grade to matching answers" placement="bottom-right"><IconButton color="primary" onClick={() => this.copyGrade(answer)}><ContentCopyIcon /></IconButton></Tooltip>),
            }}
            sortFields={['text']}
            nothingText="This assignment is graded."
            noCheckbox={true}
            noSort={true}
            disabledLink={true}
          />
          <br /><br /><br />
        </div>
      )
    });
  }

  render() {
    const {
      assignment,
      classroom,
      dispatch,
    } = this.props;
    const { isLoading } = this.state;

    console.log("rend", this.state.grades);

    return (
      <Dashboard>
        <div style={{padding:40}}>
          <Header text={assignment.name} body={classroom.name} buttonText="Done" onClick={() => dispatch(goBack())} />
          <Grid container>
            <Grid item xs={12}>
              {isLoading ? <LinearProgress /> : this.groupedAnswers()}
            </Grid>
          </Grid>
        </div>
      </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  answers: state.apiReducer.answers,
  classroom: state.apiReducer.classroom,
  assignment: state.apiReducer.assignment,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Grade)
