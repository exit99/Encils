/***
 * Entry point of the app that renders other containers with react router
 * @
 */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { orange, blue } from 'material-ui/colors';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import ScrollToTop from './router/ScrollToTop';

const theme = createMuiTheme({
  palette: createPalette({
    primary: {...blue}, 
    accent: {...orange}
  }),
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      raisedAccent: {
        // Name of the rule
        color: 'white',
      },
      root: {
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      }
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ScrollToTop>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </ScrollToTop>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
