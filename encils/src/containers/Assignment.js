import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
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
  getAssignment,
  editAssignment,
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
    dispatch(getAssignment(this.props.match.params.classroomPk))
  }

  closeUpdateAssignmentDialog() {
    this.setState({assignmentDialogOpen: false});
  }

  submitAssignmentForm(values) {
    const { dispatch, assignment } = this.props;
    const { assignmentEdit } = this.state;
    dispatch(editAssignment(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeUpdateAssignmentDialog();
        dispatch(getAssignment(this.props.match.params.classroomPk));
      };
    });
  }

  render() {
    const {
      assignment,
      dispatch,
    } = this.props;
    
    const { 
      assignmentDialogOpen,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text={classroom.name} buttonText="Add Question" onClick={() => this.setState({ assignmentDialogOpen: true })} />
            <Grid container>
              <Grid item xs={12}>
                Stuff here
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
  assignment: state.apiReducer.assignments,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
