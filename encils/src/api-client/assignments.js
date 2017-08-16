import { request } from './rest';

const getAssignments = request('GET', '/assignments/', 'assignments');
const getAssignment = (pk) => request('GET', `/assignments/${pk}/`, 'assignment')();
const getAssignmentQuestions = (pk) => request('GET', `/questions/?assignment=${pk}`, 'AssignmentQuestions')();
const createAssignment = request('POST', '/assignments/', 'assignment', 'AssignmentForm');
const editAssignment = (pk) => request('PUT', `/assignments/${pk}/`, 'assignment')();
const deleteAssignment = (pk) => request('DELETE', `/assignments/${pk}/`)();

export {
  getAssignment,
  getAssignments,
  getAssignmentQuestions,
  createAssignment,
  editAssignment,
  deleteAssignment,
}
