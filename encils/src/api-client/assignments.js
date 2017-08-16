import { request } from './rest';

const getAssignments = request('GET', '/assignments/', 'assignments');
const getAssignment = (pk) => request('GET', `/assignments/${pk}/`, 'assignment')();
const getAssignmentStudents = (pk) => request('GET', `/students/?assignment=${pk}`, 'AssignmentStudents')();
const createAssignment = request('POST', '/assignments/', 'assignment', 'AssignmentForm');
const editAssignment = (pk) => request('PUT', `/assignments/${pk}/`, 'assignment')();
const deleteAssignment = (pk) => request('DELETE', `/assignments/${pk}/`)();

export {
  getAssignment,
  getAssignments,
  getAssignmentStudents,
  createAssignment,
  deleteAssignment,
}
