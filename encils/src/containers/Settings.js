import React from 'react';
import { connect } from 'react-redux';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';

import Dashboard from './Dashboard';

import PasswordForm from './forms/PasswordForm';

import Message from '../components/Message';

import { 
  getProfile,
  setPassword,
} from '../api-client/auth';

class Settings extends React.Component {
  componentWillMount() {
    this.state = {
      passwordReset: false,
    }
    const { dispatch } = this.props;
    dispatch(getProfile());
  }

  onSubmit(values) {
    const { dispatch } = this.props;
    dispatch(setPassword(values)).then((res) => {
      this.setState({ 
        passwordReset: res && res.status === 204,
      })
    });
  }

  render() {
    const { profile, dispatch } = this.props;
    const { passwordReset } = this.state;
    
    return (
      <Dashboard>
        <div style={{padding:40}}>
          <Grid container>
            <Grid item md={12} sm={12} xs={12}>
              <Card style={{background: grey[100]}}>
                <CardContent>
                  <Typography type="headline">Details</Typography>
                  <br />
                  <Typography>Your account phone number:</Typography>
                  <Typography type="headline">{profile.sms}</Typography>
                  <br />
                  <Typography>Email:</Typography>
                  <Typography type="headline">{profile.email}</Typography>
                  <br />
                </CardContent>
              </Card>
              <br />
              {passwordReset ? <div><Message type="success" message='Password updated' /><br /></div> : null}
              <Card style={{background: grey[100]}}>
                <CardContent>
                  <Typography type="headline">Change password</Typography>
                  <PasswordForm dispatch={dispatch} onSubmit={this.onSubmit.bind(this)}/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  profile: state.apiReducer.profile,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
