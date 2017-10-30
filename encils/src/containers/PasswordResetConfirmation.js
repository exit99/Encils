import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form'
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Logo from '../components/Logo';
import Main from '../components/Main';

import PasswordResetConfirmationForm from './forms/PasswordResetConfirmationForm';

import { passwordResetConfirmation } from '../api-client/auth';

class PasswordResetConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { successful: false }
  }

  onSubmit(values) {
    const { dispatch } = this.props
    const formValues = Object.assign({}, values, this.props.match.params);
    dispatch(passwordResetConfirmation(formValues)).then((res) => {
      if (!isUndefined(res)) { this.setState({ successful: true }) };
    });
  }

  render() {
    const { dispatch } = this.props;
    const { successful } = this.state;

    return (
      <Main gradient={true}>
        <Card style={{padding: 20, minWidth: 400}}>
          <CardContent>
            <Logo style={{marginBottom: 10}}/>
            <Typography type="subheading">{successful ? 'Password reset successful.' : 'Reset Password' }</Typography>
            {successful ? null : <PasswordResetConfirmationForm onSubmit={this.onSubmit.bind(this)}/>}
          </CardContent>
          <CardActions>
            <Grid container justify="flex-end" spacing={8}>
              <Grid item>
                {successful ?
                <Button raised color="accent" onClick={() => dispatch(push('/login'))}>Return to login</Button>
                :
                <Button raised color="accent" onClick={() => dispatch(submit('passwordResetConfirmationForm'))}>Submit</Button>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirmation)
