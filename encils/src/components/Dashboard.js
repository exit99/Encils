import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';
import Menu, { MenuItem } from 'material-ui/Menu';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import { grey } from 'material-ui/colors';

import Sidebar from './Sidebar';

import ReactSidebar from 'react-sidebar';

import { gradientBackground, onDesktop } from '../utils';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      openMenu: false,
      docked: onDesktop(),
    };
  }

  handleClick(event) {
    this.setState({ openMenu: true, anchorEl: event.currentTarget });
  }

  handleRequestClose() {
    this.setState({ openMenu: false });
  }

  toggleSidebar() {
    this.setState({docked: !this.state.docked});
  }

  render() {
    const { children } = this.props;
    const { docked } = this.state;

    return (
      <ReactSidebar sidebar={<Sidebar />} docked={docked} styles={{sidebar: { background: grey[100], minWidth: 250 }}}>
        <AppBar position="static" style={gradientBackground}>
          <Toolbar>
            <div style={{flex:1}}>
              <IconButton color="contrast" aria-label="Menu" onClick={this.toggleSidebar.bind(this)}>
                <MenuIcon />
              </IconButton>
            </div>
            <IconButton 
              color="contrast"
              aria-owns={this.state.openMenu ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.openMenu}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <MenuItem onClick={this.handleRequestClose.bind(this)}>My account</MenuItem>
          <MenuItem onClick={this.handleRequestClose.bind(this)}>Logout</MenuItem>
        </Menu>
        {children}
      </ReactSidebar>
    );
  }
}

export default Dashboard
