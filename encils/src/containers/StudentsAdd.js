import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ReactInterval from 'react-interval';

import balloons from '../images/hot-air-balloon.jpeg'

import { gradientBackground, onDesktop } from '../utils';

import { getProfile } from '../api-client/auth';
import { getClassroom, getClassroomStudents } from '../api-client/classrooms';
import { editActiveItem } from '../api-client/activeItems';

const style = {
  backgroundImage: `url('${balloons}')`,
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
}

class StudentsAdd extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProfile());
    dispatch(getClassroom(this.props.match.params.classroomPk));
  }

  finish() { 
    const { dispatch } = this.props
    dispatch(editActiveItem({classroom: null, question: null}))
      .then(() => dispatch(push('/classrooms')));
  }

  renderStudent(student, index) {
    return (
      <Grid key={index} item xs={12} sm={6} md={3} lg={3} xl={2}>
        <Card>
          <CardContent>
            <Typography type="headline">{student.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  render() {
    const { dispatch, classroom, classroomStudents, profile } = this.props;
    return (
      <div style={style}>
        <AppBar position="static" style={gradientBackground}>
          <Toolbar>
            <Typography type='headline' style={{flex: 1}}>Hello Students! Text your name to {profile.sms}</Typography>
            <Button onClick={this.finish.bind(this)}>Done</Button>
          </Toolbar>
        </AppBar>
        <div style={{padding: 25}}>
          <Grid container direction='row' justify='flex-start'>
            {classroomStudents.map(this.renderStudent)} 
          </Grid>
        </div>
        <ReactInterval timeout={3000} enabled={true} callback={() => dispatch(getClassroomStudents(classroom.pk))} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  classroom: state.apiReducer.classroom,
  classroomStudents: state.apiReducer.classroomStudents,
  profile: state.apiReducer.profile,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsAdd)
