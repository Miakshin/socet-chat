import {
  UPDATE_COORDINATS,
  CLOSE_MODAL,
} from './constants';

export const updateCoordinats = (top, left, target) => ({
  type: UPDATE_COORDINATS,
  top,
  left,
  target,
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
});
