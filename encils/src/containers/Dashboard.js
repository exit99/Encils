import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';

import AppBar from 'material-ui/AppBar';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';
import Subheader from 'material-ui/Subheader';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { grey } from 'material-ui/colors';

import Logo from '../components/Logo';

import ReactSidebar from 'react-sidebar';

import { gradientBackground, onDesktop } from '../utils';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDesktop: onDesktop(),
      open: onDesktop(),
    };
  }

  logout() {
    const { dispatch } = this.props
    const cookies = new Cookies();
    cookies.remove("auth_token");
    dispatch(push('/login'));
  }

  toggleSidebar() {
    this.setState({open: !this.state.open});
  }

  navigate(path) {
    const { dispatch } = this.props;
    if (!onDesktop) { this.setState({open: false}) };
    dispatch(push(path));
  }

  render() {
    const { children, routing } = this.props;
    const { open, onDesktop } = this.state;

    const sidebar = (
      <div>
        <Card style={{height: 64}}>
          <center><Logo style={{padding: 10, height: '2.5em'}} /></center>
        </Card>
        <List>
          <ListItem style={routing.location.pathname === '/classrooms' ? {background: grey[300]} : {}} button component="a" divider={true}>
            <ListItemText primary="Classrooms" onClick={() => this.navigate('/classrooms')} />
          </ListItem>
          <ListItem style={routing.location.pathname === '/assignments' ? {background: grey[300]} : {}} button component="a" divider={true}>
            <ListItemText primary="Assignments" onClick={() => this.navigate('/assignments')} />
          </ListItem>
          <ListItem style={routing.location.pathname === '/answers' ? {background: grey[300]} : {}} button component="a" divider={true}>
            <ListItemText primary="Answers" onClick={() => this.navigate('/answers')} />
          </ListItem>
          <ListItem style={routing.location.pathname === '/reports' ? {background: grey[300]} : {}} button component="a" divider={true}>
            <ListItemText primary="Reports" onClick={() => this.navigate('/reports')} />
          </ListItem>
          <ListItem style={routing.location.pathname === '/settings' ? {background: grey[300]} : {}} button component="a" divider={true}>
            <ListItemText primary="Settings" onClick={() => this.navigate('/settings')} />
          </ListItem>
        </List>
      </div>
    )

    return (
      <ReactSidebar sidebar={sidebar} open={open && !onDesktop} docked={open && onDesktop} transitions={false} styles={{sidebar: { background: grey[100], minWidth: 250 }}}>
        <AppBar position="static" style={gradientBackground}>
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onClick={this.toggleSidebar.bind(this)}>
              <MenuIcon />
            </IconButton>
            <Typography style={{flex:1, color: 'white'}} type='headline'>Dashboard</Typography>
            <Button color="contrast" onClick={this.logout.bind(this)}>Logout</Button>
          </Toolbar>
        </AppBar>
        {children}
      </ReactSidebar>
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
