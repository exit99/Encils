import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Dashboard from './Dashboard';

const NotFound = (props) => {
  const { dispatch } = props;
  return (
    <Dashboard>
      <div style={{padding:40}}>
        <center>
        <Typography type="display4">404</Typography>
        <Typography type="display3">Page Not Found</Typography>
        </center>
      </div>
    </Dashboard>
  );
}

const mapStateToProps = state => ({
  routing: state.routing,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
