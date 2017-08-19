import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import filter from 'lodash/filter';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';

import ClassStats from '../components/ClassStats';
import StudentStats from '../components/StudentStats';
import SelectList from '../components/SelectList';

import Dashboard from './Dashboard';

import { 
  getClassroom,
  getClassrooms,
  getClassroomReport,
} from '../api-client/classrooms';

class Reports extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getClassrooms())
      .then((classrooms) => {
        if (classrooms && classrooms.length > 0) {
          this.getClassroom(classrooms[0]);
        }
      });
  }

  getClassroom({ pk }) {
    const { dispatch } = this.props;
    dispatch(getClassroom(pk))
      .then((classroom) => {
        dispatch(getClassroomReport(pk));
      });
  }

  render() {
    const {
      classroom,
      classrooms,
      classroomReport,
      dispatch,
    } = this.props;
    
    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Grid container>
              <Grid item md={3} sm={12} xs={12}>
                <Card style={{background: grey[100]}}>
                  <CardContent>
                    <SelectList 
                      title="Classroom"
                      items={classrooms}
                      selected={classroom}
                      primaryField="name"
                      onClick={this.getClassroom.bind(this)} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={9} sm={12} xs={12}>
                <AppBar position="static">
                   <Toolbar>
                     <Typography type="title" color="inherit" style={{flex: 1}}>
                       {classroom.name}
                     </Typography>
                   </Toolbar>
                 </AppBar>
                <br />
                <AppBar position="static">
                  <Tabs value={0}>
                    <Tab disabled={true} style={{opacity: 1}} label='Classroom Report' />
                  </Tabs>
                </AppBar>
                 <Card style={{background: grey[100]}}>
                  <CardContent>
                    {isEmpty(classroomReport) ? 'Loading...' : <ClassStats stats={classroomReport} />}
                    <br />
                    {isEmpty(classroomReport) ? null : <StudentStats stats={classroomReport.students} />}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  classroom: state.apiReducer.classroom,
  classrooms: state.apiReducer.classrooms,
  classroomReport: state.apiReducer.classroomReport,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
