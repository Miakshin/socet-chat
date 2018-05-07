import {
  UPDATE_LOGIN_VALUE,
  UPDATE_NAME_VALUE,
  UPDATE_PASS_VALUE,
  UPDATE_CONFIRM_PASS_VALUE,
  RESET_REGISTRATION_FORM,
} from './constants';

export const updateLogin = value => ({
  type: UPDATE_LOGIN_VALUE,
  login: value,
});
export const updateName = value => ({
  type: UPDATE_NAME_VALUE,
  name: value,
});
export const updatePass = value => ({
  type: UPDATE_PASS_VALUE,
  pass: value,
});
export const updateConfirmPass = value => ({
  type: UPDATE_CONFIRM_PASS_VALUE,
  confirmPass: value,
});
export const reset = () => ({
  type: RESET_REGISTRATION_FORM,
});
