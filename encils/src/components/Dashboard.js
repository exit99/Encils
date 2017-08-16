import React from 'react';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';
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
      docked: onDesktop(),
    };
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
            <Button color="contrast">Logout</Button>
          </Toolbar>
        </AppBar>
        {children}
      </ReactSidebar>
    );
  }
}

export default Dashboard
