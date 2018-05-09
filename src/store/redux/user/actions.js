import {
  UPDATE_USER,
  UPDATE_USER_FRIENDS,
  RESET_USER,
} from './constants';

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
});
export const updateUserFriends = friends => ({
  type: UPDATE_USER_FRIENDS,
  friends,
});
export const reset = () => ({
  type: RESET_USER,
});
