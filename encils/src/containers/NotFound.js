import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import Logo from '../components/Logo';
import Main from '../components/Main';

const NotFound = (props) => {
  const { dispatch } = props;
  return (
      <Main>
        <div style={{padding:40}}>
          <center>
          <a onClick={() => dispatch(push('/classrooms'))}>
            <Logo style={{cursor: 'pointer'}}/>
          </a>
          <br />
          <br />
          <hr />
          <Typography type="display4">404</Typography>
          <Typography type="display3">Page Not Found</Typography>
          <hr />
          <br />
          <br />
          <Button raised color="accent" onClick={() => dispatch(push('/classrooms'))}>Return</Button>
          </center>
        </div>
      </Main>
  );
}

const mapStateToProps = state => ({
  routing: state.routing,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
