import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import mean from 'lodash/mean'
import round from 'lodash/round'
import phoneFormatter from 'phone-formatter';

import ReactTable from "react-table";
import "react-table/react-table.css";

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
import StudentForm from './forms/StudentForm';

import { editActiveItem } from '../api-client/activeItems';

import { 
  getClassroom,
  getClassroomStudents,
  getClassroomAnswers,
  createClassroomStudent,
  deleteStudent,
} from '../api-client/classrooms';

class Classroom extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      addStudentsDialogOpen: false,
      addStudentsManuallyDialogOpen: false,
    }
  }

  componentWillMount() {
    const { dispatch, classroom } = this.props;
    dispatch(getClassroom(this.props.match.params.classroomPk))
      .then(() => {
        dispatch(getClassroomStudents(this.props.match.params.classroomPk))
        dispatch(getClassroomAnswers(this.props.match.params.classroomPk))
      });
  }

  closeDialogs() {
    this.setState({
      addStudentsDialogOpen: false,
      addStudentsManuallyDialogOpen: false,
    });
  }

  submitStudentForm(values) {
    const { dispatch, classroom } = this.props;
    values.classroom = classroom.pk;
    values.phone = `1${phoneFormatter.normalize(values.phone)}`;

    dispatch(createClassroomStudent(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeDialogs();
        dispatch(getClassroomStudents(this.props.match.params.classroomPk));
      };
    });
  }

  deleteStudent(pk) {
    const { dispatch } = this.props;
    dispatch(deleteStudent(pk))
      .then(() => {
        dispatch(getClassroomStudents(this.props.match.params.classroomPk))
      });
  }

 goToAddStudents() {
    const { dispatch } = this.props;
    const classroomPk = this.props.match.params.classroomPk;
    dispatch(editActiveItem({classroom: classroomPk, question: null}))
      .then(() => dispatch(push(`/students-add/${classroomPk}`)));
  }

  renderGradeTable() {
    const { classroomAnswers } = this.props;
    return (
      <ReactTable
        data={classroomAnswers}
        columns={[
          {
            Header: "Grades",
            columns: [
              {
                Header: "Student",
                id: "student",
                accessor: answer => answer.student.name,
              },
              {
                Header: "Assignment",
                id: "assignment",
                accessor: answer => answer.assignment.name,
              },
            ]
          },
          {
            columns: [
              {
                Header: "Question",
                id: "question",
                accessor: answer => answer.question.text,
              },
              {
                Header: "Grade",
                accessor: "grade",
                Cell: row => `${row.value}%`,
                aggregate: vals => round(mean(vals)),
                Aggregated: row => {
                  return (
                    <span>
                      {row.value}% (avg)
                    </span>
                  );
                  },
                Footer: (
                    <span>
                      <strong>Average:</strong>{" "}
                      {round(mean(classroomAnswers.map(d => d.grade)))}%
                    </span>
                  )
              }
            ]
          }
        ]}
        pivotBy={["student", "assignment"]}
        defaultPageSize={classroomAnswers.length}
        className="-striped -highlight"
      />
    );
  }

  render() {
    const {
      classroom,
      classroomStudents,
      dispatch,
    } = this.props;
    
    const { 
      addStudentsDialogOpen,
      addStudentsManuallyDialogOpen,
    } = this.state;

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text={classroom.name} buttonText="Add Students" onClick={() => this.setState({ addStudentsDialogOpen: true })} pointer={classroomStudents.length === 0 && !addStudentsDialogOpen} />
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  titles={['Students', 'Grades']}
                  items={[
                    (<SortableList
                      items={classroomStudents}
                      getTitle={(student) => student.name}
                      getSubtitle={(student) => phoneFormatter.format(student.phone, "(NNN) NNN-NNNN")}
                      sortFields={['name', 'grade']}
                      properties={{
                        'Grade': student => `${student.grade}%`
                      }}
                      nothingText="You have no students in this class yet."
                      onDelete={this.deleteStudent.bind(this)}
                      deleteMsg="This will delete all of the student's grades."
                      disabledLink={true}
                    />),
                    this.renderGradeTable(),
                  ]}
                />
              </Grid>
            </Grid>
          </div>

          <Dialog open={addStudentsDialogOpen} onRequestClose={this.closeDialogs.bind(this)} style={{minWidth: 400}}>
            <DialogTitle>How do you want to add students?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid container>
                  <Grid item xs={12} md={5}>
                    <center>
                      <SMSIcon style={{width: 80, height: 80, cursor: 'pointer'}} onClick={this.goToAddStudents.bind(this)} />
                      <br />
                      <Button style={{backgroundColor: grey[300]}} onClick={this.goToAddStudents.bind(this)}>via Text</Button>
                    </center>
                  </Grid>
                  <Grid item xs={12} md={2}><Typography type="title"><center style={{marginTop: 40}}>OR</center></Typography></Grid>
                  <Grid item xs={12} md={5}>
                    <center>
                      <CreateIcon style={{width: 80, height: 80, cursor: 'pointer'}} onClick={() => this.setState({addStudentsManuallyDialogOpen: true})} />
                      <br />
                      <Button style={{backgroundColor: grey[300]}} onClick={() => this.setState({addStudentsManuallyDialogOpen: true})}>Manually</Button>
                    </center>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <FullScreenDialog title="Add Student" open={addStudentsManuallyDialogOpen} onClose={this.closeDialogs.bind(this)}>
            <StudentForm dispatch={dispatch} onSubmit={this.submitStudentForm.bind(this)} />
          </FullScreenDialog>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  classroom: state.apiReducer.classroom,
  classroomStudents: state.apiReducer.classroomStudents,
  classroomAnswers: state.apiReducer.classroomAnswers,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Classroom)
