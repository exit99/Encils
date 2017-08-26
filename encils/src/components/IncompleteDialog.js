import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const IncompleteDialog = (props) => {
  const { open, onContinue } = props;

  return (
     <Dialog open={open} onRequestClose={onClose}>
        <DialogTitle>
         Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Not all students have answered the current question.  Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <center>
            <Button onClick={onClose} color="primary">
              No
            </Button>
            <Button onClick={onContinue} color="primary">
              Yes
            </Button>
          </center>
        </DialogActions>
      </Dialog>
  );
}

export default IncompleteDialog;
