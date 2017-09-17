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

import StillThereDialog from '../components/StillThereDialog';
import StudentCount from '../components/StudentCount';

import phoneFormatter from 'phone-formatter';
import ReactInterval from 'react-interval';

import balloons from '../images/hot-air-balloon.jpeg'

import { gradientBackground, onDesktop, requestLimit } from '../utils';

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
    this.state = {
      requestCount: 0
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProfile());
    dispatch(getClassroom(this.props.match.params.classroomPk));
  }

  finish() { 
    const { dispatch, classroom } = this.props
    dispatch(editActiveItem({classroom: null, question: null}))
      .then(() => dispatch(push(`/classrooms/${classroom.pk}`)));
  }

  getStudents() {
    const { dispatch, classroom } = this.props;
    const { requestCount } = this.state;
    if (requestCount < requestLimit) {
      dispatch(getClassroomStudents(classroom.pk))
      this.setState({ requestCount: requestCount + 1 });
    }
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
    const { dispatch, classroom, classroomStudents, profile} = this.props;
    const { requestCount } = this.state;
    return (
      <div style={style}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type='headline' style={{flex: 1, color: 'white'}}>Hello Students! Text your name to {profile.sms && phoneFormatter.format(profile.sms, "(NNN) NNN-NNNN")}</Typography>
            <StudentCount count={classroomStudents.length} />
            <Button color="contrast" onClick={this.finish.bind(this)}>Done</Button>
          </Toolbar>
        </AppBar>
        <div style={{padding: 25}}>
          <Grid container direction='row' justify='flex-start'>
            {classroomStudents.map(this.renderStudent)} 
          </Grid>
        </div>
        <ReactInterval timeout={3000} enabled={true} callback={this.getStudents.bind(this)} />

        <StillThereDialog open={requestCount >= requestLimit} onClose={() => this.setState({ requestCount: 0 })} />
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
