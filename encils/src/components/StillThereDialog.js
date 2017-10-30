import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog';

const StillThereDialog = (props) => {
  const { open, onClose } = props;

  return (
     <Dialog open={open} onRequestClose={onClose}>
        <DialogTitle>
          Still there?
        </DialogTitle>
        <DialogActions>
          <center>
            <Button onClick={onClose} color="primary">
              Yes
            </Button>
          </center>
        </DialogActions>
      </Dialog>
  );
}


export default StillThereDialog;
