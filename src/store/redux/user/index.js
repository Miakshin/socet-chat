import {
  UPDATE_USER,
  UPDATE_USER_FRIENDS,
  RESET_USER,
} from './constants';

const initialState = {
  login: '',
  name: '',
  friends: [],
  id: '',
  confirmPass: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    case UPDATE_USER_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};
