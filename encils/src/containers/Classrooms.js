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
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

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
} from '../api-client/classrooms';

class Classrooms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createClassroomOpen: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getClassrooms())
      .then((data) => { 
        if (data && data.length > 0) this.getClassroom(data[0]);
      });
  }

  getClassroom({pk}) {
    const { dispatch } = this.props;
    dispatch(getClassroom(pk))
      .then(dispatch(getClassroomStudents(pk)))
      .then(this.setState({}));
  }

  closeCreateClassroomDialog(save=false) {
    this.setState({createClassroomOpen: false});
  }

  createClassroom(values) {
    const { dispatch } = this.props;
    dispatch(createClassroom(values)).then((res) => {  
      if (!isUndefined(res)) { 
        this.setState({createClassroomOpen: false}) 
        dispatch(getClassrooms());
      };
    });
  }

  render() {
    const {
      classroom,
      classrooms,
      classroomStudents,
      dispatch
    } = this.props;
    
    const { 
      createClassroomOpen,
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
                      primaryField="name"
                      secondaryField="school"
                      onClick={this.getClassroom.bind(this)} />
                    <Button style={{width: '100%'}} raised color="primary"
                      onClick={() => this.setState({createClassroomOpen: true})}>
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
                     <Button color="contrast">Edit</Button>
                     <Button color="contrast">Delete</Button>
                   </Toolbar>
                 </AppBar>
                <br />
                {classroom ? 
                <Card style={{background: grey[100]}}>
                  <CardContent>
                    <Typography style={{padding: 5}} type="headline" component="h2">Students</Typography>
                    <StudentTable students={classroomStudents} />
                  </CardContent>
                </Card> : null}
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Create Classoom" open={createClassroomOpen} onClose={this.closeCreateClassroomDialog.bind(this)}>
            <ClassroomForm dispatch={dispatch} onSubmit={this.createClassroom.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  classroom: state.apiReducer.classroom,
  classrooms: state.apiReducer.classrooms,
  classroomStudents: state.apiReducer.classroomStudents,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Classrooms)
