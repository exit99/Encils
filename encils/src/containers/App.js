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

import Login from './Login';
import Classrooms from './Classrooms';
import Assignments from './Assignments';
import StudentsAdd from './StudentsAdd';
import AssignmentActive from './AssignmentActive';
import Grades from './Grades';
import Reports from './Reports';
import Settings from './Settings';
import NotFound from './NotFound';
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
      raised: {
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px',
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
              <Route exact path='/' component={Login} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/classrooms' component={Classrooms} />
              <Route exact path='/assignments' component={Assignments} />
              <Route exact path='/students-add/:classroomPk' component={StudentsAdd} />
              <Route exact path='/assignment-active/:classroomPk/:assignmentPk/:questionIndex' component={AssignmentActive} />
              <Route exact path='/grades' component={Grades} />
              <Route exact path='/reports' component={Reports} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='*' component={NotFound} status={404} />
            </Switch>
          </ScrollToTop>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
