import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import { gutterPadding } from '../utils';
import Header from './Header';

const FullScreenDialog = (props) => {
  const { title, open, onClose, children } = props;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onRequestClose={onClose}
        transition={<Slide direction="up" />}
      >
        <AppBar color="primary">
          <Toolbar style={gutterPadding}>
            <Typography type="title" style={{flex: 1, color: 'white' }}>
              {title} 
            </Typography>
            <IconButton style={{ color: 'white' }} onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{marginTop: 75}}>
          <div style={gutterPadding}>
            {children}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default FullScreenDialog;
