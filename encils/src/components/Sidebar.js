import React from 'react';

import Card from 'material-ui/Card';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Logo from './Logo';


class Sidebar extends React.Component {
  render() {
    return (
      <div>
      <Card style={{height: 64}}>
        <center><Logo style={{padding: 10, height: '2.5em'}} /></center>
      </Card>
      <List>
        <ListItem button component="a" href="#simple-list" divider={true}>
          <ListItemText primary="Classrooms" />
        </ListItem>
        <ListItem button component="a" href="#simple-list" divider={true}>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component="a" href="#simple-list" divider={true}>
          <ListItemText primary="Assignments" />
        </ListItem>
        <ListItem button component="a" href="#simple-list" divider={true}>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
      </div>
    );
  }
}

export default Sidebar
