import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import registration from './registration';

export default combineReducers({
  routing: routerReducer,
  registration,
});
