import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';

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

import { gradientBackground, onDesktop, gutterPadding } from '../utils';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDesktop: onDesktop(),
      anchorEl: undefined,
      open: false,
    };
  }

  logout() {
    const { dispatch } = this.props
    const cookies = new Cookies();
    cookies.remove("auth_token");
    dispatch(push('/login'));
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { children, routing, dispatch } = this.props;
    const { open, onDesktop } = this.state;

    return (
      <div>
        <AppBar position="static" style={gradientBackground}>
          <Toolbar style={gutterPadding}>
              <div style={{flex: 1}}>
                <Button><Logo style={{padding: 10, height: '2.5em'}} /></Button>
                <Button onClick={() => dispatch(push('/assignments'))}><Typography>Quizzes</Typography></Button>
                <Button onClick={() => dispatch(push('/classrooms'))}><Typography>Classrooms</Typography></Button>
              </div>
              <Avatar className={{backgroundColor: 'orange'}}>VK</Avatar>
              <div>
                <Typography>vickiekazanski@gmail.com</Typography>
                <Typography type="body1"><i>813-234-2884</i></Typography>
              </div>
              <Button
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
                <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
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
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
