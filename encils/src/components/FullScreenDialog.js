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

class FullScreenDialog extends Component {
  render() {
    const { title, open, onClose, children } = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onRequestClose={onClose}
          transition={<Slide direction="up" />}
        >
          <AppBar>
            <Toolbar>
              <Typography type="title" color="inherit" style={{flex: 1}}>
                {title} 
              </Typography>
              <IconButton color="contrast" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{marginTop: 25}}>
            {children}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default FullScreenDialog;
