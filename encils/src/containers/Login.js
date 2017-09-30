import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form'
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Logo from '../components/Logo';
import Main from '../components/Main';

import LoginForm from './forms/LoginForm';

import { login } from '../api-client/auth';

import { onDesktop } from '../utils';

class Login extends React.Component {
  onSubmit(values) {
    const { dispatch } = this.props
    dispatch(login(values)).then((res) => {
      if(!isUndefined(res)) { dispatch(push('/')) };
    });
  }

  render() {
    const { dispatch } = this.props;

    let cardStyle = { padding: 20 };
    if (onDesktop()) { cardStyle.minWidth = 400 };

    return (
      <Main gradient={true}>
        <Card style={cardStyle}>
          <CardContent>
            <Logo style={{marginBottom: 10}}/>
            <Typography type="subheading">Sign in to continue</Typography>
            <LoginForm onSubmit={this.onSubmit.bind(this)}/>
            <Grid container justify="flex-end">
              <Grid item>
                <a style={{cursor: 'pointer', fontSize: 12}} onClick={() => dispatch(push('/password-reset'))} >Forgot password?</a>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify="flex-end" spacing={8}>
              <Grid item>
                <Button raised color="accent" onClick={() => dispatch(submit('loginForm'))}>Sign in</Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
