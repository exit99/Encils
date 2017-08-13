import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form'

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Logo from '../components/Logo';
import Main from '../components/Main';

import RegisterationForm from './forms/RegistrationForm';

import { register } from '../api-client/auth';

class Register extends React.Component {
  onSubmit(values) {
    const { dispatch } = this.props
    dispatch(register());
  }

  render() {
    const { dispatch } = this.props;

    return (
        <Main gradient={true}>
          <Card style={{padding: 20, minWidth: 400}}>
            <CardContent>
              <Logo style={{marginBottom: 10}}/>
              <Typography type="subheading">Register for an account</Typography>
              <RegisterationForm onSubmit={this.onSubmit.bind(this)}/>
            </CardContent>
            <CardActions>
              <Grid container justify="flex-end" spacing={8}>
                <Grid item>
                  <Button raised color="accent" onClick={() => dispatch(submit('registrationForm'))}>Register</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
