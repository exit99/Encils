/**
* create-react-app-intro
* Redux reducer index file
* author: @
*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

const initialState = {
  auth_token: '',
}

const apiReducer = (previousState = initialState, { key, form, data, type }) => {
  switch (type) {
    case 'API_SUCCESS':
      debugger;
      return Object.assign({}, previousState, {key: data})
    default:
      return previousState;
  }
}

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  apiReducer: apiReducer
});
