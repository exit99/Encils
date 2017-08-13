import React from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';

let Message = ({ type, message, theme, ...props }) => {
  const styles = {
    error: {
      backgroundColor: theme.palette[type][100],
      color: 'black'
    }
  }

  return <Paper elevation={0} style={{padding: 15, ...styles[type]}}><Typography color="inherit">{message}</Typography></Paper>
}

export default withTheme(Message);


