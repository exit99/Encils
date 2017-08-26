import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

import AssignmentTable from '../components/AssignmentTable';
import FullScreenDialog from '../components/FullScreenDialog';
import SelectList from '../components/SelectList';
import QuestionTable from '../components/QuestionTable';

import Dashboard from './Dashboard';
import AssignmentForm from './forms/AssignmentForm';
import QuestionForm from './forms/QuestionForm';

import { 
  getAssignment,
  getAssignments,
  getAssignmentQuestions,
  createAssignment,
  editAssignment,
  deleteAssignment,
  createQuestion,
  deleteQuestion,
} from '../api-client/assignments';

import {
  getActiveItem,
  editActiveItem,
} from '../api-client/activeItems';


class Assignments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assignmentDialogOpen: false,
      assignmentEdit: false,
      questionDialogOpen: false,
    }
  }

  componentWillMount() {
    const { dispatch, assignment } = this.props;
    dispatch(getAssignments())
      .then((data) => { 
        if (data && data.length > 0 && isEmpty(assignment)) {
          this.getAssignment(data[0]);
          dispatch(getAssignmentQuestions(data[0].pk));
        }
      });
  }

  getAssignment({pk}) {
    const { dispatch } = this.props;
    dispatch(getAssignment(pk))
      .then(({ pk }) =>{
        dispatch(getAssignmentQuestions(pk));
      }).then(this.setState({}))
  }

  closeUpdateAssignmentDialog() {
    this.setState({assignmentDialogOpen: false});
  }

  submitAssignmentForm(values) {
    const { dispatch, assignment } = this.props;
    const { assignmentEdit } = this.state;
    const method = assignmentEdit ? editAssignment(assignment.pk) : createAssignment;
    console.log(values);
    dispatch(method(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeUpdateAssignmentDialog();
        dispatch(getAssignments());
        this.getAssignment(res);
      };
    });
  }

  deleteAssignment() {
    const { dispatch, assignment } = this.props;
    dispatch(deleteAssignment(assignment.pk))
      .then(() => {
        dispatch(getAssignments())
          .then((data) => { 
            if (data && data.length > 0) this.getAssignment(data[0]);
          });
      });
  }

  closeQuestionDialog() {
    this.setState({questionDialogOpen: false});
  }

  submitQuestionForm(values) {
    const { dispatch, assignment } = this.props;
    values['assignment'] = assignment.pk;
    dispatch(createQuestion(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeQuestionDialog();
        dispatch(getAssignmentQuestions(assignment.pk));
      };
    });
  }

  onQuestionDelete(pk) {
    const { dispatch, assignment } = this.props;
    dispatch(deleteQuestion(pk))
      .then(() => { dispatch(getAssignmentQuestions(assignment.pk)) });
  }

  render() {
    const {
      assignment,
      assignments,
      assignmentQuestions,
      dispatch,
    } = this.props;
    
    const { 
      assignmentDialogOpen,
      assignmentEdit,
      questionDialogOpen,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Grid container>
              <Grid item md={3} sm={12} xs={12}>
                <Card style={{background: grey[100]}}>
                  <CardContent>
                    <SelectList 
                      title="Assignments"
                      items={assignments}
                      selected={assignment}
                      primaryField="name"
                      onClick={this.getAssignment.bind(this)} />
                    <Button style={{width: '100%'}} raised color="primary"
                      onClick={() => this.setState({assignmentDialogOpen: true, assignmentEdit: false})}>
                      Create Assignment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              { assignments.length === 0 ? null :
              <Grid item md={9} sm={12} xs={12}>
                <AppBar position="static">
                   <Toolbar>
                     <Typography type="title" color="inherit" style={{flex: 1}}>
                       {assignment.name}
                     </Typography>
                     <Button color="contrast" onClick={() => this.setState({questionDialogOpen: true})}>Add Question</Button>
                     <Button color="contrast" onClick={() => this.setState({assignmentDialogOpen: true, assignmentEdit: true})}>Edit</Button>
                     <Button color="contrast" onClick={this.deleteAssignment.bind(this)}>Delete</Button>
                   </Toolbar>
                 </AppBar>
                <br />
                <AppBar position="static">
                  <Tabs value={0}>
                    <Tab disabled={true} style={{opacity: 1}} label="Questions" />
                  </Tabs>
                </AppBar>
                 <Card style={{background: grey[100]}}>
                  <CardContent>
                    <QuestionTable questions={assignmentQuestions} onDelete={this.onQuestionDelete.bind(this)} />
                  </CardContent>
                </Card>
              </Grid>
              }
            </Grid>
          </div>

          <FullScreenDialog title="Create Assignment" open={assignmentDialogOpen} onClose={this.closeUpdateAssignmentDialog.bind(this)}>
            <AssignmentForm dispatch={dispatch} onSubmit={this.submitAssignmentForm.bind(this)} initialValues={assignmentEdit ? assignment : {}} />
          </FullScreenDialog>

          <FullScreenDialog title="Add Question" open={questionDialogOpen} onClose={this.closeQuestionDialog.bind(this)}>
            <QuestionForm dispatch={dispatch} onSubmit={this.submitQuestionForm.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignment: state.apiReducer.assignment,
  assignments: state.apiReducer.assignments,
  assignmentQuestions: state.apiReducer.assignmentQuestions,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
