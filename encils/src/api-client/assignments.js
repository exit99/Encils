import moment from 'moment';
import { request } from './rest';

const getAssignments = request('GET', '/assignments/', 'assignments');
const getAssignment = (pk) => request('GET', `/assignments/${pk}/`, 'assignment')();
const createAssignment = request('POST', '/assignments/', 'assignment', 'assignmentForm');
const editAssignment = (pk) => request('PUT', `/assignments/${pk}/`, 'assignment');
const deleteAssignment = (pk) => request('DELETE', `/assignments/${pk}/`)();
const getUngradedAssignments = request('GET', `/assignments/ungraded/`, 'ungradedAssignments');

const getAssignmentQuestions = (pk) => request('GET', `/questions/?assignment=${pk}`, 'assignmentQuestions')();
const createQuestion = request('POST', '/questions/', 'question', 'questionForm');
const deleteQuestion = (pk) => request('DELETE', `/questions/${pk}/`)();

const getQuestionAnswers = (pk, classroomPk) => request('GET', `/answers/?question=${pk}&classroom=${classroomPk}`, 'questionAnswers')();
const editQuestionAnswer = (pk) => request('PUT', `/answers/${pk}/`, 'answer');
const resetQuestionAnswers = (dispatch) => dispatch({ key: 'questionAnswers', data: [], type: 'API_SUCCESS'}) 

const getAssignmentAnswers = (pk) => request('GET', `/answers/?assignment=${pk}`, 'assignmentAnswers')();
const getAnswers = (classroom, assignment) => request('GET', `/answers/?classroom=${classroom}&assignment=${assignment}`, 'answers')();

const downloadAssignmentGrades = ({pk, name}) => request('GET', `/assignments/${pk}/grades/download/`, null, null, `${name} grades ${moment().format('MM_DD_YYYY')}.csv`)();

export {
  getAssignment,
  getAssignments,
  createAssignment,
  editAssignment,
  deleteAssignment,

  getAssignmentQuestions,
  getAssignmentAnswers,
  createQuestion,
  deleteQuestion,

  getQuestionAnswers,
  editQuestionAnswer,
  resetQuestionAnswers,
  getUngradedAssignments,
  getAnswers,

  downloadAssignmentGrades,
}
