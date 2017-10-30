import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import groupBy from 'lodash/groupBy';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

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
      this.setState({ grades });
    });
    dispatch(getAssignment(this.props.match.params.assignmentPk));
    dispatch(getClassroom(this.props.match.params.classroomPk));
  }

  updateGrade(answerPk) {
    const { dispatch } = this.props;
    const { grades } = this.state;

    return (event) => {
      const newGrade = event.target.value;

      let newGrades = Object.assign({}, grades);
      newGrades[answerPk] = newGrade;
      this.setState({ grades: newGrades });

      dispatch(editQuestionAnswer(answerPk)({ grade: newGrade }))
        .then(() => { 
        });
    }
  }

  groupedAnswers() {
    const { answers } = this.props;
    const { grades } = this.state;
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
                return (
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
                  </div>
                )
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
      assignment,
      classroom,
      dispatch,
    } = this.props;

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
