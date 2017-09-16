import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';

import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import CreateIcon from 'material-ui-icons/Create';
import SMSIcon from 'material-ui-icons/Sms';
import { grey } from 'material-ui/colors';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import Message from '../components/Message';
import SortableList from '../components/SortableList';
import Tabs from '../components/Tabs';

import Dashboard from './Dashboard';
import QuestionForm from './forms/QuestionForm';

import { editActiveItem } from '../api-client/activeItems';

import { 
  getAssignment,
  getAssignmentQuestions,
  createQuestion,
  deleteQuestion,
} from '../api-client/assignments';

class Assignment extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      addQuestionsDialogOpen: false,
    }
  }

  componentWillMount() {
    const { dispatch, assignment } = this.props;
    dispatch(getAssignment(this.props.match.params.assignmentPk))
      .then(() => {
        dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk))
      });
  }

  submitQuestionForm(values) {
    const { dispatch, assignment } = this.props;
    values.assignment = assignment.pk;

    dispatch(createQuestion(values)).then((res) => {
      if (!isUndefined(res)) {
        this.setState({addQuestionsDialogOpen: false});
        dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk));
      };
    });
  }

  deleteQuestion(pk) {
    const { dispatch } = this.props;
    dispatch(deleteQuestion(pk))
      .then(() => {
        dispatch(getAssignmentQuestions(this.props.match.params.assignmentPk))
      });
  }

  render() {
    const {
      assignment,
      assignmentQuestions,
      dispatch,
    } = this.props;
    
    const { 
      addQuestionsDialogOpen,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text={assignment.name} buttonText="Add Question" onClick={() => this.setState({ addQuestionsDialogOpen: true })} />
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  titles={['Questions', 'Completed Quizzes']}
                  items={[
                    (<SortableList
                      items={assignmentQuestions}
                      getTitle={(question) => question.text}
                      getSubtitle={(question) => moment(question.created).calendar()}
                      sortFields={['text', 'grade']}
                      properties={{
                        'Avg. Grade': question => `${question.grade}%`
                      }}
                      nothingText="You have no questions in this quiz yet."
                      onDelete={this.deleteQuestion.bind(this)}
                      deleteMsg="This will delete all grades for this question and could change student averages."
                    />),
                    null,
                  ]}
                />
              </Grid>
            </Grid>
          </div>

          <FullScreenDialog title="Add Question" open={addQuestionsDialogOpen} onClose={() => this.setState({addQuestionsDialogOpen: false})}>
            <QuestionForm dispatch={dispatch} onSubmit={this.submitQuestionForm.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignment: state.apiReducer.assignment,
  assignmentQuestions: state.apiReducer.assignmentQuestions,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
