import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import CheckIcon from 'material-ui-icons/CheckCircle';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';

import AssignmentTable from '../components/AssignmentTable';
import FullScreenDialog from '../components/FullScreenDialog';
import SelectList from '../components/SelectList';
import StudentTable from '../components/StudentTable';
import Header from '../components/Header';
import SortableList from '../components/SortableList';

import Dashboard from './Dashboard';
import ClassroomForm from './forms/ClassroomForm';

import { 
  getClassroom,
  getClassrooms,
  createClassroom,
  editClassroom,
  deleteClassroom,
  getClassroomStudents,
  deleteStudent,
} from '../api-client/classrooms';

import { 
  getAssignment,
  getAssignments,
  getAssignmentQuestions,
} from '../api-client/assignments';

import {
  getActiveItem,
  editActiveItem,
} from '../api-client/activeItems';


class Classrooms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classroomDialogOpen: false,
      classroomEdit: false,
      startAssignmentDialogOpen: false,
      tabValue: 0
    }
  }

  componentWillMount() {
    const { dispatch, classroom } = this.props;
    dispatch(getClassrooms())
      .then((data) => { 
        if (data && data.length > 0 && isEmpty(classroom)) {
          this.getClassroom(data[0]);
          dispatch(getAssignments());
        }
      });
  }

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  };

  getClassroom({pk}) {
    const { dispatch } = this.props;
    dispatch(getClassroom(pk))
      .then(dispatch(getClassroomStudents(pk)))
      .then(this.setState({}));
  }

  closeUpdateClassroomDialog() {
    this.setState({classroomDialogOpen: false});
  }

  submitClassroomForm(values) {
    const { dispatch, classroom } = this.props;
    const { classroomEdit } = this.state;
    const method = classroomEdit ? editClassroom(classroom.pk) : createClassroom;
    dispatch(method(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeUpdateClassroomDialog();
        dispatch(getClassrooms());
        this.getClassroom(res);
      };
    });
  }

  deleteClassroom() {
    const { dispatch, classroom } = this.props;
    dispatch(deleteClassroom(classroom.pk))
      .then(() => {
        dispatch(getClassrooms())
          .then((data) => { 
            if (data && data.length > 0) this.getClassroom(data[0]);
          });
      });
  }

  onStudentDelete(pk) {
    const { dispatch, classroom } = this.props;
    dispatch(deleteStudent(pk))
      .then(() => { dispatch(getClassroomStudents(classroom.pk)) });
  }

  goToAddStudents() {
    const { dispatch, classroom } = this.props;
    dispatch(editActiveItem({classroom: classroom.pk, question: null}))
      .then(() => dispatch(push(`/students-add/${classroom.pk}`)));
  }

  goToAssignmentStart(assignment_pk) {
    const { dispatch, classroom } = this.props;
    dispatch(getAssignment(assignment_pk))
      .then(() => {
        dispatch(getAssignmentQuestions(assignment_pk))
          .then((questions) => {
            dispatch(push(`/assignment-active/${classroom.pk}/${assignment_pk}/0`));
          });
      });
  }

  startAssignment() { 
    const { dispatch } = this.props;
    const { startAssignmentDialogOpen } = this.state;
    dispatch(getAssignments()).then(() => this.setState({startAssignmentDialogOpen: true}));
  }

  renderAssignment(assignment, index) {
    if (!assignment.question_count) { return null };
    const { classroom } = this.props;
    return (
      <ListItem button onClick={() => this.goToAssignmentStart(assignment.pk)}>
        { !isEmpty(classroom) && classroom.assignments_given.indexOf(assignment.pk) > -1 ?
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon> : null }
        <ListItemText primary={assignment.name} />
      </ListItem>
    )
  }

  render() {
    const {
      assignments,
      classroom,
      classrooms,
      classroomStudents,
      dispatch,
    } = this.props;
    
    const { 
      classroomDialogOpen,
      classroomEdit,
      startAssignmentDialogOpen,
      tabValue,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text="Classes" buttonText="Create Class" />
            <Grid container>
              <Grid item xs={12}>
                <SortableList items={classrooms} />
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
  classroom: state.apiReducer.classroom,
  classrooms: state.apiReducer.classrooms,
  classroomStudents: state.apiReducer.classroomStudents,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Classrooms)
