import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';
import Gravatar from 'react-gravatar'
import phoneFormatter from 'phone-formatter';
import reduce from 'lodash/reduce';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import Menu, { MenuItem } from 'material-ui/Menu';

import Logo from '../components/Logo';
import pointerImage from '../images/pointer.png'

import { gradientBackground, onDesktop, gutterPadding } from '../utils';
import { getProfile } from '../api-client/auth';
import { getClassrooms } from '../api-client/classrooms';
import { getAssignments } from '../api-client/assignments';

const highlightedStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.12)' 
}

const pointerStyle = {
  marginBottom: -100,
  marginLeft: -58,
  marginRight: 26 
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDesktop: onDesktop(),
      anchorEl: undefined,
      open: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProfile());
    dispatch(getClassrooms());
    dispatch(getAssignments());
  }

  logout() {
    const { dispatch } = this.props
    const cookies = new Cookies();
    cookies.remove("auth_token");
    dispatch(push('/login'));
    this.handleRequestClose()
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { children, routing, dispatch, profile, classrooms, assignments, answers, classroomStudents, assignmentQuestions } = this.props;
    const { open, onDesktop } = this.state;

    const onHomePage = this.props.routing.location.pathname === '/';
    const onAssignmentPage = this.props.routing.location.pathname.startsWith('/assignment');
    const onClassroomPage = this.props.routing.location.pathname.startsWith('/classroom');
    const studentCount = reduce(classrooms, (sum, x) => sum + x.students.length, 0) + classroomStudents.length;
    const questionCount = reduce(assignments, (sum, x) => sum + x.question_count, 0) + assignmentQuestions.length;
    const gpaTotal = reduce(classrooms, (sum, x) => sum + x.gpa, 0);
    const renderQuizPointer = !onAssignmentPage && studentCount > 0 && assignments.length === 0;
    const renderHomePointer = !onHomePage && studentCount > 0 && assignments.length > 0 && questionCount > 0 && gpaTotal === 0;
    console.log(renderHomePointer, classrooms, assignments, answers.length);

    return (
      <div>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar style={gutterPadding}>
            <div style={{flex: 1}}>
              <Button color="contrast" onClick={() => dispatch(push('/'))}>ENCILS</Button>
              {renderHomePointer ? <img style={pointerStyle} className="bounce" src={pointerImage} alt='pointer' /> : null}
              <Button style={onAssignmentPage ? highlightedStyle : {}}  color="contrast" onClick={() => dispatch(push('/assignments'))}>Quizzes</Button>
              {renderQuizPointer ? <img style={pointerStyle} className="bounce" src={pointerImage} alt='pointer' /> : null}
              <Button style={onClassroomPage ? highlightedStyle : {}}color="contrast" onClick={() => dispatch(push('/classrooms'))}>Classrooms</Button>
            </div>
            <Avatar><Gravatar email={profile.email} /></Avatar>
            <div style={{ padding: 20 }}>
              <Typography style={{ color: 'white' }}>{profile.email}</Typography>
              <Typography style={{ color: 'white' }} type="body1"><i>{profile.sms && phoneFormatter.format(profile.sms, "(NNN) NNN-NNNN")}</i></Typography>
            </div>
            <Button
              color="contrast"
              aria-owns={this.state.open ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
            >
              <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Grid container style={{paddingTop: 40}}>
          <Grid item xs={12} style={gutterPadding}>
            {children}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  profile: state.apiReducer.profile,
  answers: state.apiReducer.answers,
  assignments: state.apiReducer.assignments,
  assignmentQuestions: state.apiReducer.assignmentQuestions,
  classrooms: state.apiReducer.classrooms,
  classroomStudents: state.apiReducer.classroomStudents,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
