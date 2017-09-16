import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import SortableList from '../components/SortableList';

import Dashboard from './Dashboard';
import ClassroomForm from './forms/ClassroomForm';

import { 
  createClassroom,
  deleteClassroom,
  getClassrooms,
} from '../api-client/classrooms';

class Classrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classroomDialogOpen: false,
    }
  }

  componentWillMount() {
    const { dispatch, classroom } = this.props;
    dispatch(getClassrooms());
  }

  submitClassroomForm(values) {
    const { dispatch, classroom } = this.props;
    dispatch(createClassroom(values)).then((res) => {
      if (!isUndefined(res)) {
        this.setState({ classroomDialogOpen: false });
        dispatch(getClassrooms());
      };
    });
  }

  deleteClassroom(pk) {
    const { dispatch } = this.props;
    dispatch(deleteClassroom(pk))
      .then(() => {
        dispatch(getClassrooms())
      });
  }

  render() {
    const {
      classrooms,
      dispatch,
    } = this.props;

    const { classroomDialogOpen } = this.state;
    
    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text="Classes" buttonText="Create Class" onClick={() => this.setState({ classroomDialogOpen: true })} />
            <Grid container>
              <Grid item xs={12}>
                <SortableList 
                  items={classrooms}
                  getTitle={(classroom) => classroom.name}
                  getSubtitle={(classroom) => `Created: ${moment(classroom.created).calendar()}`}
                  properties={{
                    'Avg. Score': (classroom) => `${classroom.gpa}%`,
                    'Answer Rate': (classroom) => `${classroom.answer_rate}%`,
                    'Assignments': (classroom) => classroom.assignments_given.length,
                    'Students': (classroom) => classroom.students.length,
                  }}
                  sortFields={['name', 'created']}
                  onDelete={this.deleteClassroom.bind(this)}
                  nothingText="You have no classrooms yet."
                  onLinkClick={({pk}) => dispatch(push(`/classrooms/${pk}`))}
                />
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Create Classoom" open={classroomDialogOpen} onClose={() => this.setState({ classroomDialogOpen: false })}>
            <ClassroomForm dispatch={dispatch} onSubmit={this.submitClassroomForm.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  classrooms: state.apiReducer.classrooms,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Classrooms)
