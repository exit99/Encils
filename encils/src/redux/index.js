/**
* create-react-app-intro
* Redux reducer index file
* author: @
*/
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

const initialState = {
  activeItem: {},
  answer: {},
  auth_token: '',
  assignment: {},
  assignments: [],
  assignmentQuestions: [],
  assignmentAnswers: [],
  classroom: {},
  classrooms: [],
  classroomStudents: [],
  classroomAnswers: [],
  profile: {},
  report: {},
  questionAnswers: [],
  passwordResponse: null,
}

const apiReducer = (previousState = initialState, { key, form, data, type }) => {
  switch (type) {
    case 'API_SUCCESS':
      let newData = {}
      newData[key] = data
      return Object.assign({}, previousState, newData)
    default:
      return previousState;
  }
}

export default combineReducers({
  apiReducer: apiReducer,
  routing: routerReducer,
  form: formReducer,
});
