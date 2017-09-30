import moment from 'moment';
import { request } from './rest';

const getClassrooms = request('GET', '/classrooms/', 'classrooms');
const getClassroom = (pk) => request('GET', `/classrooms/${pk}/`, 'classroom')();
const createClassroom = request('POST', '/classrooms/', 'classroom', 'classroomForm');
const editClassroom = (pk) => request('PUT', `/classrooms/${pk}/`, 'classroom');
const deleteClassroom = (pk) => request('DELETE', `/classrooms/${pk}/`)();

const getClassroomStudents = (pk) => request('GET', `/students/?classroom=${pk}`, 'classroomStudents')();
const createClassroomStudent = request('POST', '/students/', null, 'studentForm');
const deleteStudent = (pk) => request('DELETE', `/students/${pk}/`)();

const getClassroomReport = (pk) => request('GET', `/reports/${pk}/`, 'classroomReport')();
const getClassroomAnswers = (pk) => request('GET', `/answers/?classroom=${pk}`, 'classroomAnswers')();

const downloadGrades = ({pk, name}) => request('GET', `/classrooms/${pk}/grades/download/`, null, null, `${name} grades ${moment().format('MM_DD_YYYY')}.csv`)();

export {
  getClassroom,
  getClassrooms,
  createClassroom,
  editClassroom,
  deleteClassroom,

  getClassroomStudents,
  createClassroomStudent,
  deleteStudent,

  getClassroomReport,
  getClassroomAnswers,

  downloadGrades,
}
