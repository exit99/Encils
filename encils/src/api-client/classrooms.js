import { request } from './rest';

const getClassrooms = request('GET', '/classrooms/', 'classrooms');
const getClassroom = (pk) => request('GET', `/classrooms/${pk}/`, 'classroom')();
const getClassroomStudents = (pk) => request('GET', `/students/?classroom=${pk}`, 'classroomStudents')();
const createClassroom = request('POST', '/classrooms/', 'classroom', 'classroomForm');
const editClassroom = (pk) => request('PUT', `/classrooms/${pk}/`, 'classroom')();
const deleteClassroom = (pk) => request('DELETE', `/classrooms/${pk}/`)();

export {
  getClassroom,
  getClassrooms,
  getClassroomStudents,
  createClassroom,
  deleteClassroom,
}
