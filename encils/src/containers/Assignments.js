import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import reduce from 'lodash/reduce';
import moment from 'moment';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import SortableList from '../components/SortableList';

import Dashboard from './Dashboard';
import AssignmentForm from './forms/AssignmentForm';

import { 
  getAssignments,
  createAssignment,
  deleteAssignment,
} from '../api-client/assignments';

class Assignments extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      assignmentDialogOpen: false,
    }
  }

  componentWillMount() {
    const { dispatch, assignment } = this.props;
    dispatch(getAssignments())
  }

  closeUpdateAssignmentDialog() {
    this.setState({assignmentDialogOpen: false});
  }

  submitAssignmentForm(values) {
    const { dispatch, assignment } = this.props;
    const { assignmentEdit } = this.state;
    dispatch(createAssignment(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeUpdateAssignmentDialog();
        dispatch(getAssignments());
      };
    });
  }

  deleteAssignment(pk) {
    const { dispatch } = this.props;
    dispatch(deleteAssignment(pk))
      .then(() => {
        dispatch(getAssignments())
      });
  }

  render() {
    const {
      assignments,
      dispatch,
    } = this.props;
    
    const { 
      assignmentDialogOpen,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text="Quizzes" buttonText="Create Quiz" onClick={() => this.setState({ assignmentDialogOpen: true })} pointer={assignments.length === 0} />
            <Grid container>
              <Grid item xs={12}>
                <SortableList 
                  items={assignments}
                  getTitle={(assignment) => assignment.name}
                  getSubtitle={(assignment) => `Created: ${moment(assignment.created).calendar()}`}
                  properties={{
                  'Hide Answers': (assignment) => assignment.hide_answers ? <CheckIcon /> : <CloseIcon />,
                    'Show One': (assignment) => assignment.one_at_a_time ? <CheckIcon /> : <CloseIcon />,
                    'Questions': (assignment) => assignment.question_count,
                  }}
                  sortFields={['name', 'created']}
                  onDelete={this.deleteAssignment.bind(this)}
                  deleteMsg="This will delete all of this quizzes grades and could change student averages."
                  nothingText="You have not made any quizzes yet."
                  onLinkClick={({pk}) => dispatch(push(`/assignments/${pk}`))}
                  pointer={reduce(assignments, (sum, x) => sum + x.question_count, 0) === 0}
                />
              </Grid>
            </Grid>
          </div>


          <FullScreenDialog title="Create Quiz" open={assignmentDialogOpen} onClose={this.closeUpdateAssignmentDialog.bind(this)}>
            <AssignmentForm dispatch={dispatch} onSubmit={this.submitAssignmentForm.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignments: state.apiReducer.assignments,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
