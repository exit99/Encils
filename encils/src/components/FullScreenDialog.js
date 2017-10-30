import React from 'react';

import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import { gutterPadding, onDesktop } from '../utils';

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
          <Toolbar style={onDesktop() ? gutterPadding : {}}>
            <Typography type="title" style={{flex: 1, color: 'white' }}>
              {title} 
            </Typography>
            <IconButton style={{ color: 'white' }} onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{marginTop: 75}}>
          <div style={onDesktop() ? gutterPadding : {padding: 20}}>
            {children}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default FullScreenDialog;
