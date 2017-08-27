import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form'
import { push } from 'react-router-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Logo from '../components/Logo';
import Main from '../components/Main';

import PasswordResetForm from './forms/PasswordResetForm';

import { passwordReset } from '../api-client/auth';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false }
  }

  onSubmit(values) {
    const { dispatch } = this.props
    dispatch(passwordReset(values)).then((res) => {
      this.setState({ submitted: true });
    });
  }

  render() {
    const { dispatch } = this.props;
    const { submitted } = this.state;

    return (
      <Main gradient={true}>
        <Card style={{padding: 20, minWidth: 400}}>
          <CardContent>
            <Logo style={{marginBottom: 10}}/>
            <Typography type="subheading">{submitted ? 'If the email exists password reset instructions have been sent.' : 'Enter email to reset password.'}</Typography>
            {submitted ? null : <PasswordResetForm onSubmit={this.onSubmit.bind(this)}/>}
          </CardContent>
          <CardActions>
            <Grid container justify="flex-end" spacing={8}>
              <Grid item>
                {submitted ?
                <Button raised color="accent" onClick={() => dispatch(push('/login'))}>Return to login</Button>
                :
                <Button raised color="accent" onClick={() => dispatch(submit('passwordResetForm'))}>Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
