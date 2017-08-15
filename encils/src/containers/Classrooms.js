import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import Header from '../components/Header';
import SelectList from '../components/SelectList';
import TargetTable from '../components/TargetTable';

import { 
  getClassroom,
  getClassrooms,
  getClassroomStudents
} from '../api-client/classrooms';

class Classrooms extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getClassrooms())
      .then((data) => { 
        if (data.length > 0) this.getClassroom(data[0]);
      });
  }

  getClassroom({pk}) {
    const { dispatch } = this.props;
    dispatch(getClassroom(pk))
      .then(dispatch(getClassroomStudents(pk)))
      .then(this.setState({}));
  }

  render() {
    const { classroom, classrooms, classroomStudents } = this.props;

    return (
        <Header>
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
                    <Button style={{width: '100%'}} raised color="primary">Create Classroom</Button>
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
                    <TargetTable data={classroomStudents} fields={['name', 'phone']} />
                  </CardContent>
                </Card> : null}
              </Grid>
            </Grid>
          </div>
        </Header>
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
