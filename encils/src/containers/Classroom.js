import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import isUndefined from 'lodash/isUndefined';
import mean from 'lodash/mean';
import reduce from 'lodash/reduce';
import round from 'lodash/round';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import phoneFormatter from 'phone-formatter';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText, } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import CreateIcon from 'material-ui-icons/Create';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import SMSIcon from 'material-ui-icons/Sms';
import { grey } from 'material-ui/colors';

import FullScreenDialog from '../components/FullScreenDialog';
import Header from '../components/Header';
import NothingHere from '../components/NothingHere';
import SortableList from './SortableList';
import Tabs from '../components/Tabs';

import Dashboard from './Dashboard';
import StudentForm from './forms/StudentForm';

import { onDesktop } from '../utils';

import { editActiveItem } from '../api-client/activeItems';
import { downloadGrades } from '../api-client/classrooms';

import { 
  getClassroom,
  getClassroomStudents,
  getClassroomAnswers,
  createClassroomStudent,
  editClassroomStudent,
  deleteStudent,
} from '../api-client/classrooms';
import { getAssignments } from '../api-client/assignments';
import { getProfile } from '../api-client/auth';

class Classroom extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      addStudentsDialogOpen: false,
      addStudentsManuallyDialogOpen: false,
      updateGradesDialogOpen: false,
      editStudent: {},
      isLoading: true,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getClassroom(this.props.match.params.classroomPk))
      .then(() => {
        dispatch(getClassroomStudents(this.props.match.params.classroomPk))
          .then(() => {
            dispatch(getAssignments())
              .then(() => this.setState({ isLoading: false }));
          })
        dispatch(getClassroomAnswers(this.props.match.params.classroomPk))
      });
  }

  closeDialogs() {
    this.setState({
      addStudentsDialogOpen: false,
      addStudentsManuallyDialogOpen: false,
      updateGradesDialogOpen: false,
      editStudent: {},
    });
  }

  submitStudentForm(values) {
    const { dispatch, classroom } = this.props;
    const { editStudent } = this.state;
    values.classroom = classroom.pk;
    values.phone = `1${phoneFormatter.normalize(values.phone)}`;
    const method = isEmpty(editStudent) ? createClassroomStudent : editClassroomStudent(editStudent.pk);
    dispatch(method(values)).then((res) => {
      if (!isUndefined(res)) {
        this.closeDialogs();
        dispatch(getClassroomStudents(this.props.match.params.classroomPk));
        dispatch(getProfile());
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

  editStudent(student) {
    this.setState({addStudentsManuallyDialogOpen: true, editStudent: student})
  }

  renderGradeTable() {
    const { classroomAnswers, assignments } = this.props;
    if (classroomAnswers.length > 0) {
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
                  accessor: answer => find(assignments, (assignment) => assignment.pk === answer.assignment)['name'],
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
    } else {
      return <NothingHere text="No grades for this classroom yet." />
    }
  }

  renderAssignments() {
    const { assignments, classroomAnswers, dispatch } = this.props;
    if (assignments.length > 0) {
      const assignmentAns = reduce(classroomAnswers, (data, answer) => { 
        const assignment = find(assignments, (assignment) => assignment.pk === answer.assignment);
        data[assignment.name] = {classroomPk: answer.classroom, assignmentPk: assignment.pk};
        return data;
      }, {});

      const listItems = Object.keys(assignmentAns).map((key) => {
        const assignment = assignmentAns[key];
        return <ListItem button><ListItemText primary={key} onClick={() => dispatch(push(`/grade/${assignment.classroomPk}/${assignment.assignmentPk}`))} /></ListItem>
      });
      return <List>{listItems}</List>
    }
  }

  render() {
    const {
      classroom,
      classroomStudents,
      classroomAnswers,
      profile,
      dispatch,
    } = this.props;
    
    const { 
      addStudentsDialogOpen,
      addStudentsManuallyDialogOpen,
      updateGradesDialogOpen,
      editStudent,
      isLoading,
    } = this.state;

    const tabButtons = classroomAnswers.length === 0 ? [] : [
      null,
      (<Grid container>
        <Grid item xs={6}>
          <Button style={{ width: '100%' }} raised color="primary" onClick={() => dispatch(downloadGrades(classroom))}><FileDownloadIcon /> Download</Button>
        </Grid>
        <Grid item xs={6}>
          <Button style={{ width: '100%', padding: (onDesktop() ? 0 : 15) }} raised color="primary" onClick={() => this.setState({updateGradesDialogOpen: true})}>Edit Grades</Button>
        </Grid>
      </Grid>)
    ];

    return (
        <Dashboard>
          <div style={{padding:40}}>
            <Header text={classroom.name} buttonText="Add Students" onClick={() => this.setState({ addStudentsDialogOpen: true })} pointer={profile.pointer_step === "student" && !addStudentsDialogOpen} />
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  titles={['Students', 'Grades']}
                  buttons={tabButtons}
                  items={[
                    (<SortableList
                      items={classroomStudents}
                      isLoading={isLoading}
                      getTitle={(student) => student.name}
                      getSubtitle={(student) => phoneFormatter.format(student.phone, "(NNN) NNN-NNNN")}
                      sortFields={['name', 'grade']}
                      properties={{
                        'Grade': student => `${student.grade}%`
                      }}
                      nothingText="There are no students in this classroom yet."
                      onDelete={this.deleteStudent.bind(this)}
                      deleteMsg="This will delete all of the student's grades."
                      onLinkClick={(student) => this.editStudent(student)}
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

          <FullScreenDialog title={`${isEmpty(editStudent) ? 'Add' : 'Edit'} Student`} open={addStudentsManuallyDialogOpen} onClose={this.closeDialogs.bind(this)}>
            <StudentForm dispatch={dispatch} onSubmit={this.submitStudentForm.bind(this)} initialValues={editStudent} />
          </FullScreenDialog>

          <FullScreenDialog title="Select Assignment" open={updateGradesDialogOpen} onClose={this.closeDialogs.bind(this)}>
            {this.renderAssignments()}
          </FullScreenDialog>

        </Dashboard>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  assignments: state.apiReducer.assignments,
  classroom: state.apiReducer.classroom,
  classroomStudents: state.apiReducer.classroomStudents,
  classroomAnswers: state.apiReducer.classroomAnswers,
  profile: state.apiReducer.profile,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Classroom)
