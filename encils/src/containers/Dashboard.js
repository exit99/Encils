import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';
import Gravatar from 'react-gravatar'
import phoneFormatter from 'phone-formatter';

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

import { onDesktop, gutterPadding } from '../utils';
import { getProfile } from '../api-client/auth';

const highlightedStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.12)' 
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
    const { children, routing, dispatch, profile,  } = this.props;
    const { open, onDesktop } = this.state;

    const onHomePage = this.props.routing.location.pathname === '/';
    const onAssignmentPage = this.props.routing.location.pathname.startsWith('/assignment');
    const onClassroomPage = this.props.routing.location.pathname.startsWith('/classroom');
    const renderHomePointer = !onHomePage && profile.pointer_step === 'answer';
    const renderAssignmentPointer = !onAssignmentPage && (profile.pointer_step === 'assignment' || profile.pointer_step === 'question');
    const renderClassroomPointer = !onClassroomPage && !onHomePage && (profile.pointer_step === 'classroom' || profile.pointer_step === 'student');

    return (
      <div>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar style={gutterPadding}>
            <div style={{flex: 1}}>
              <Button color="contrast" onClick={() => dispatch(push('/'))}>ENCILS</Button>
              {renderHomePointer ? <img style={{ marginBottom: -100, marginLeft: -58, marginRight: 26 }} className="bounce" src={pointerImage} alt='pointer' /> : null}
              <Button style={onAssignmentPage ? highlightedStyle : {}}  color="contrast" onClick={() => dispatch(push('/assignments'))}>Quizzes</Button>
              {renderAssignmentPointer ? <img style={{ marginBottom: -100, marginLeft: -58, marginRight: 26 }} className="bounce" src={pointerImage} alt='pointer' /> : null}
              <Button style={onClassroomPage ? highlightedStyle : {}}color="contrast" onClick={() => dispatch(push('/classrooms'))}>Classrooms</Button>
              {renderClassroomPointer ? <img style={{ marginBottom: -100, marginLeft: -80, marginRight: 26 }} className="bounce" src={pointerImage} alt='pointer' /> : null}
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
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
