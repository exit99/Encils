import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import Cookies from 'universal-cookie';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import SortableList from './SortableList';

import Dashboard from './Dashboard';
import WelcomeTour from './WelcomeTour';

import { onDesktop } from '../utils';

import { 
  getUngradedAssignments,
  getAssignments,
  getAssignment,
  getAssignmentQuestions,
} from '../api-client/assignments';

import { 
  getClassrooms,
} from '../api-client/classrooms';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuizDialogOpen: false,
      selectedClassroom: 0,
      selectedAssignment: 0,
      timeOfDay: this.timeOfDay(),
      isLoading: true,
    }
  }
  componentWillMount() {
    const { dispatch  } = this.props;
    dispatch(getAssignments());
    dispatch(getClassrooms());
    dispatch(getUngradedAssignments())
      .then(() => this.setState({ isLoading: false }))
  }

  goToAssignmentStart(assignment_pk, classroom_pk) {
    const { dispatch } = this.props;
    dispatch(getAssignment(assignment_pk))
      .then(() => {
        dispatch(getAssignmentQuestions(assignment_pk))
          .then((questions) => {
            dispatch(push(`/assignment-active/${classroom_pk}/${assignment_pk}/0`));
          });
      });
  }

  timeOfDay() {
    const m = moment();
	  let g = null;
	  
	  if(!m || !m.isValid()) { return; }
	  
	  const split_afternoon = 12 
	  const split_evening = 17
	  const currentHour = parseFloat(m.format("HH"));
	  
	  if(currentHour >= split_afternoon && currentHour <= split_evening) {
	  	g = "afternoon";
	  } else if(currentHour >= split_evening) {
	  	g = "evening";
	  } else {
	  	g = "morning";
	  }
	  
	  return g;
  }

  render() {
    const {
      ungradedAssignments,
      classrooms,
      assignments,
      profile,
      dispatch,
    } = this.props;

    const {
      startQuizDialogOpen,
      selectedClassroom,
      selectedAssignment,
      timeOfDay,
      isLoading,
    } = this.state;

    const cookies = new Cookies();
    const welcomeTour = cookies.get("welcomeTour");

    if (!welcomeTour) {
      return <WelcomeTour />
    } 

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header 
              text={timeOfDay != null ? `Good ${timeOfDay}!` : "Well hello there!"}
              body={profile.pointer_step === 'answer' ? "Almost there. Give your first quiz by clicking the start quiz button." : "Below are some recommendations to help you get the most out of Encils."}
              pointer={profile.pointer_step === 'answer'}
              buttonText="Start Quiz" 
              onClick={() => this.setState({ startQuizDialogOpen: true })} />
            <Grid container>
              <Grid item xs={12} md={12}>
                <Typography type="title">Needs Grading</Typography>
                <SortableList 
                  items={ungradedAssignments}
                  isLoading={isLoading}
                  getTitle={(assignment) => assignment.name}
                  getSubtitle={(assignment) => assignment.classroom}
                  properties={{
                  '': (assignment) => <Button raised color="primary" onClick={() => dispatch(push(`/grade/${assignment.classroom_pk}/${assignment.pk}`))}>Grade</Button>
                  }}
                  sortFields={['name', 'classroom']}
                  nothingText="Everything is graded!"
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
                style={{width: onDesktop() ? 400 : 100}}
                value={selectedClassroom}
                onChange={(event) => this.setState({selectedClassroom: event.target.value})}
                input={<Input id="age-simple" />}
              >
                <MenuItem value={0}><em>None</em></MenuItem>
                {classrooms.map((classroom, index) => <MenuItem key={index} value={classroom.pk}>{classroom.name}</MenuItem>)}
              </Select>
            </FormControl>
            <br /><br />
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Assignment</InputLabel>
              <Select
                style={{width: onDesktop() ? 400 : 100}}
                value={selectedAssignment}
                onChange={(event) => this.setState({selectedAssignment: event.target.value})}
                input={<Input id="age-simple" />}
              >
                <MenuItem value={0}><em>None</em></MenuItem>
                {assignments.map((assignment, index) => <MenuItem key={index} value={assignment.pk}>{assignment.name}</MenuItem>)}
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
  profile: state.apiReducer.profile,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
