import { request } from './rest';

const getClassrooms = request('GET', '/classrooms/', 'classrooms');
const getClassroom = (pk) => request('GET', `/classrooms/${pk}/`, 'classroom')();
const getClassroomStudents = (pk) => request('GET', `/students/?classroom=${pk}`, 'classroomStudents')();

export {
  getClassroom,
  getClassrooms,
  getClassroomStudents,
}
