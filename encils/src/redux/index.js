/**
* create-react-app-intro
* Redux reducer index file
* author: @
*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

const initialState = {
  token: '',
}

const apiReducer = (previousState = initialState, { key, form, data, type }) => {
  switch (type) {
    case 'API_SUCCESS':
      return Object.assign({}, previousState, {key: data})
    case 'API_ERROR':
      return Object.assign({}, previousState, {formErrors: { form: data }})
    default:
      return previousState;
  }
}

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  apiReducer: apiReducer
});
