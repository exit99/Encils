import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Header from '../components/Header';

import Dashboard from './Dashboard';

import books from '../images/books.png'

class WelcomeTour extends React.Component {
  render() {
    const {dispatch } = this.props;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header 
              text="Welcome to Encils" 
              body="Below you will find instructions to help you get started."
              buttonText="Get Started" 
              onClick={() => this.setState({ startQuizDialogOpen: true })} />
            <Grid container>
              <Grid item xs={12} md={3}>
                <center>
                <img style={{ padding: 40, width: '10em' }} src={books} alt='books' />
                <Typography type="headline">1. Create a Classroom</Typography></center>
              </Grid>
              <Grid item xs={12} md={3}>
                <center>
                <img style={{ padding: 40, width: '10em' }} src={books} alt='boyreading' />
                <Typography type="headline">2. Add Students</Typography></center>
              </Grid>
              <Grid item xs={12} md={3}>
                <center>
                <img style={{ padding: 40, width: '10em' }} src={books} alt='boyreading' />
                <Typography type="headline">3. Create a Quiz</Typography></center>
              </Grid>
              <Grid item xs={12} md={3}>
                <center>
                <img style={{ padding: 40, width: '10em' }} src={books} alt='boyreading' />
                <Typography type="headline">4. Start your First Quiz</Typography></center>
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
