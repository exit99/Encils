import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import SortableList from '../components/SortableList';

import Dashboard from './Dashboard';
import StartQuizForm from './forms/StudentForm';

import { 
  getUngradedAssignments,
  getAssignments,
  getAssignment,
  getAssignmentQuestions,
} from '../api-client/assignments';

import { 
  getClassrooms,
} from '../api-client/classrooms';

import {
  getActiveItem,
  editActiveItem,
} from '../api-client/activeItems';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuizDialogOpen: false,
      selectedClassroom: 0,
      selectedAssignment: 0,
    }
  }
  componentWillMount() {
    const { dispatch  } = this.props;
    dispatch(getUngradedAssignments());
    dispatch(getAssignments());
    dispatch(getClassrooms());
  }

  submitStartQuizForm(values) {
    debugger;
  }

  goToAssignmentStart(assignment_pk, classroom_pk) {
    const { dispatch, classroom } = this.props;
    dispatch(getAssignment(assignment_pk))
      .then(() => {
        dispatch(getAssignmentQuestions(assignment_pk))
          .then((questions) => {
            dispatch(push(`/assignment-active/${classroom_pk}/${assignment_pk}/0`));
          });
      });
  }

  render() {
    const {
      ungradedAssignments,
      classrooms,
      assignments,
      dispatch,
    } = this.props;

    const {
      startQuizDialogOpen,
      selectedClassroom,
      selectedAssignment,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header 
              text="Hello there, good to see you!" 
              body="Below are some recommendations to help you get the most out of Encils."
              buttonText="Start Quiz" 
              onClick={() => this.setState({ startQuizDialogOpen: true })} />
            <Grid container>
              <Grid item xs={12} md={12}>
                <Typography type="title">Needs Grading</Typography>
                <SortableList 
                  items={ungradedAssignments}
                  getTitle={(assignment) => assignment.name}
                  getSubtitle={(assignment) => assignment.classroom}
                  properties={{
                  '': (assignment) => <Button raised color="primary" onClick={() => dispatch(push(`/grade/${assignment.classroom_pk}/${assignment.pk}`))}>Grade</Button>
                  }}
                  sortFields={['name', 'classroom']}
                  nothingText="Everything is graded. Way to go!"
                  noCheckbox={true}
                  noSort={true}
                  disabledLink={true}
                />
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Start Quiz" open={startQuizDialogOpen} onClose={() => this.setState({ startQuizDialogOpen: false })}>
            <br />
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Classroom</InputLabel>
              <Select
                style={{width: 400}}
                value={selectedClassroom}
                onChange={(event) => this.setState({selectedClassroom: event.target.value})}
                input={<Input id="age-simple" />}
              >
                <MenuItem value={0}><em>None</em></MenuItem>
                {classrooms.map((classroom) => <MenuItem value={classroom.pk}>{classroom.name}</MenuItem>)}
              </Select>
            </FormControl>
            <br /><br />
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Assignment</InputLabel>
              <Select
                style={{width: 400}}
                value={selectedAssignment}
                onChange={(event) => this.setState({selectedAssignment: event.target.value})}
                input={<Input id="age-simple" />}
              >
                <MenuItem value={0}><em>None</em></MenuItem>
                {assignments.map((assignment) => <MenuItem value={assignment.pk}>{assignment.name}</MenuItem>)}
              </Select>
            </FormControl>
            <br /><br />
            <Button 
              raised
              disabled={selectedClassroom === 0 || selectedAssignment === 0 ? true : false}
              color="accent"
              onClick={() => this.goToAssignmentStart(selectedAssignment, selectedClassroom)}
            >Start</Button>
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  ungradedAssignments: state.apiReducer.ungradedAssignments,
  classrooms: state.apiReducer.classrooms,
  assignments: state.apiReducer.assignments,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
