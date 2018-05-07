import {
  UPDATE_LOGIN_VALUE,
  UPDATE_NAME_VALUE,
  UPDATE_PASS_VALUE,
  UPDATE_CONFIRM_PASS_VALUE,
  RESET_REGISTRATION_FORM,
} from './constants';

const initialState = {
  login: '',
  name: '',
  pass: '',
  confirmPass: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_VALUE:
      return {
        ...state,
        login: action.login,
      };
    case UPDATE_NAME_VALUE:
      return {
        ...state,
        name: action.name,
      };
    case UPDATE_PASS_VALUE:
      return {
        ...state,
        pass: action.pass,
      };
    case UPDATE_CONFIRM_PASS_VALUE:
      return {
        ...state,
        confirmPass: action.confirmPass,
      };
    case RESET_REGISTRATION_FORM:
      return initialState;
    default:
      return state;
  }
};
