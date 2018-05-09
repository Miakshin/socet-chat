import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import registration from './registration';
import chat from './chat';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  registration,
  chat,
  user,
});
