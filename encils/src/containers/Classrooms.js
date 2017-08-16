import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isUndefined from 'lodash/isUndefined';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

import AssignmentTable from '../components/AssignmentTable';
import Dashboard from '../components/Dashboard';
import FullScreenDialog from '../components/FullScreenDialog';
import SelectList from '../components/SelectList';
import StudentTable from '../components/StudentTable';

import ClassroomForm from './forms/ClassroomForm';

import { 
  getClassroom,
  getClassrooms,
  getClassroomStudents,
  createClassroom,
  deleteClassroom,
} from '../api-client/classrooms';

import { 
  getAssignments,
} from '../api-client/assignments';


class Classrooms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classroomDialogOpen: false,
      classroomEdit: false,
      tabValue: 0
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getClassrooms())
      .then((data) => { 
        if (data && data.length > 0) {
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

  closeCreateClassroomDialog(save=false) {
    this.setState({classroomDialogOpen: false});
  }

  createClassroom(values) {
    const { dispatch } = this.props;
    dispatch(createClassroom(values)).then((res) => {  
      if (!isUndefined(res)) { 
        this.setState({classroomDialogOpen: false}) 
        dispatch(getClassrooms());
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
      tabValue,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Grid container>
              <Grid item md={3} sm={12} xs={12}>
                <Card style={{background: grey[100]}}>
                  <CardContent>
                    <SelectList 
                      title="Classrooms"
                      items={classrooms}
                      selected={classroom}
                      primaryField="name"
                      secondaryField="school"
                      onClick={this.getClassroom.bind(this)} />
                    <Button style={{width: '100%'}} raised color="primary"
                      onClick={() => this.setState({classroomDialogOpen: true, classroomEdit: false})}>
                      Create Classroom
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={9} sm={12} xs={12}>
                <AppBar position="static">
                   <Toolbar>
                     <Typography type="title" color="inherit" style={{flex: 1}}>
                       {classroom.name}
                     </Typography>
                     <Button color="contrast">Add Students</Button>
                     <Button color="contrast" onClick={() => this.setState({classroomDialogOpen: true, classroomEdit: true})}>Edit</Button>
                     <Button color="contrast" onClick={this.deleteClassroom.bind(this)}>Delete</Button>
                   </Toolbar>
                 </AppBar>
                <br />

                <AppBar position="static">
                  <Tabs value={tabValue} onChange={this.handleTabChange.bind(this)}>
                    <Tab label="Students" />
                    <Tab label="Assignments" />
                    <Tab label="Reports" />
                  </Tabs>
                </AppBar>
                {tabValue === 0 && 
                 <Card style={{background: grey[100]}}>
                  <CardContent>
                    <Typography style={{padding: 5}} type="headline" component="h2">Students</Typography>
                    <StudentTable students={classroomStudents} />
                  </CardContent>
                </Card>
                }
                {tabValue === 1 && 
                <Card style={{background: grey[100]}}>
                  <CardContent>
                    <Typography style={{padding: 5}} type="headline" component="h2">Completed Assignments</Typography>
                    <AssignmentTable assignments={assignments} />
                  </CardContent>
                </Card>
                }
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Create Classoom" open={classroomDialogOpen} onClose={this.closeCreateClassroomDialog.bind(this)}>
            <ClassroomForm dispatch={dispatch} onSubmit={this.createClassroom.bind(this)} initialValues={classroomEdit ? classroom : {}} />
          </FullScreenDialog>
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
