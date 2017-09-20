import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Header from '../components/Header';

import Dashboard from './Dashboard';

import boyreading from '../images/boyreading.png'
import checklist from '../images/checklist.png'
import desk from '../images/desk.png'
import phone from '../images/phone.png'

class WelcomeTour extends React.Component {
  render() {
    const { dispatch } = this.props;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header 
              text="Welcome to Encils" 
              body="Below are the steps you will take to give your first quiz. You will need your cell phone to text in answers."
              buttonText="Get Started" 
              pointer={true}
              onClick={() => dispatch(push('/classrooms'))} />
            <Grid container>
              <Grid item xs={12} md={3}>
                <center>
                  <img style={{ padding: 40, width: '15em' }} src={desk} alt='desk' />
                  <Typography type="headline">1. Create a Classroom</Typography>
                </center>
              </Grid>
              <Grid item xs={12} md={3}>
                <center>
                  <img style={{ padding: 40, width: '15em' }} src={boyreading} alt='boyreading' />
                  <Typography type="headline">2. Add Students</Typography>
                </center>
              </Grid>
              <Grid item xs={12} md={3}>
                <center>
                  <img style={{ padding: 40, width: '15em' }} src={checklist} alt='checklist' />
                  <Typography type="headline">3. Create a Quiz</Typography>
                </center>
              </Grid>
              <Grid item xs={12} md={3}>
                <center>
                  <img style={{ padding: 40, width: '15em' }} src={phone} alt='phone' />
                  <Typography type="headline">4. Collect answers</Typography>
                </center>
              </Grid>
            </Grid>
          </div>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeTour)
