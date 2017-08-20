import React from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { green, red } from 'material-ui/colors';

let Message = ({ type, message, theme, ...props }) => {
  const styles = {
    error: {
      backgroundColor: red[100],
      color: 'black'
    },
    success: {
      backgroundColor: green[100],
      color: 'black'
    }
  }

  return <Paper elevation={0} style={{padding: 15, ...styles[type]}}><Typography color="inherit">{message}</Typography></Paper>
}

export default Message;


