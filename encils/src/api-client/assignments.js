import { request } from './rest';

const getAssignments = request('GET', '/assignments/', 'assignments');
const getAssignment = (pk) => request('GET', `/assignments/${pk}/`, 'assignment')();
const createAssignment = request('POST', '/assignments/', 'assignment', 'assignmentForm');
const editAssignment = (pk) => request('PUT', `/assignments/${pk}/`, 'assignment');
const deleteAssignment = (pk) => request('DELETE', `/assignments/${pk}/`)();

const getAssignmentQuestions = (pk) => request('GET', `/questions/?assignment=${pk}`, 'assignmentQuestions')();
const createQuestion = request('POST', '/questions/', 'question', 'questionForm');
const deleteQuestion = (pk) => request('DELETE', `/questions/${pk}/`)();

const getQuestionAnswers = (pk) => request('GET', `/answers/?question=${pk}`, 'questionAnswers')();
const editQuestionAnswer = (pk) => request('PUT', `/answers/${pk}/`, 'answer');
const resetQuestionAnswers = (dispatch) => dispatch({ key: 'questionAnswers', data: [], type: 'API_SUCCESS'}) 

export {
  getAssignment,
  getAssignments,
  createAssignment,
  editAssignment,
  deleteAssignment,

  getAssignmentQuestions,
  createQuestion,
  deleteQuestion,

  getQuestionAnswers,
  editQuestionAnswer,
  resetQuestionAnswers,
}
