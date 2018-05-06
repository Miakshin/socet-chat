import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import regestration from './regestration'

export default combineReducers({
  routing: routerReducer,
  counter
})
