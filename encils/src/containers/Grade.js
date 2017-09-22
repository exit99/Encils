import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push, goBack } from 'react-router-redux';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import SortableList from './SortableList';

import Dashboard from './Dashboard';
import ClassroomForm from './forms/ClassroomForm';

import { 
  getAnswers,
  getAssignment,
  editQuestionAnswer,
} from '../api-client/assignments';

import { 
  getClassroom,
} from '../api-client/classrooms';

class Grade extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getAnswers(
      this.props.match.params.classroomPk,
      this.props.match.params.assignmentPk,
    ));
    dispatch(getAssignment(this.props.match.params.assignmentPk));
    dispatch(getClassroom(this.props.match.params.classroomPk));
  }

  updateGrade(answerPk) {
    const { dispatch } = this.props;
    return (event) => {
      dispatch(editQuestionAnswer(answerPk)({ grade: event.target.value }))
    }
  }

  groupedAnswers() {
    const { answers } = this.props;
    const groupedAnswers = groupBy(answers, (answer) => answer.question.pk)
    const groupedValues = Object.values(groupedAnswers);
    return groupedValues.map((ans) => {
      return (
        <div>
          <Typography type="title">{ans[0].question.text}</Typography>
          <br />
          <SortableList 
            items={ans}
            getTitle={(answer) => answer.text}
            getSubtitle={(answer) => answer.student.name}
            properties={{
              '': (answer) => {
                return (<TextField
                  label="Grade %"
                  type="number"
                  style={{ width: '100%' }}
                  value={answer.grade}
                  onChange={this.updateGrade(answer.pk)}
                  inputProps={{
                    'min': '0',
                    'max': '100',
                  }}
                />)
              },
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
      answers,
      assignment,
      classroom,
      dispatch,
    } = this.props;

    debugger;


    return (
      <Dashboard>
        <div style={{padding:40}}>
          <Header text={assignment.name} body={classroom.name} buttonText="Done" onClick={() => dispatch(goBack())} />
          <Grid container>
            <Grid item xs={12}>
              {this.groupedAnswers()}
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
