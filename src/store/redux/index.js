import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import registration from './registration';
import chat from './chat';

export default combineReducers({
  routing: routerReducer,
  registration,
  chat
});
