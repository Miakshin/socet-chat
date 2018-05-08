import {
  UPDATE_COORDINATS,
  CLOSE_MODAL,
} from './constants';

export const updateCoordinats = (top, left) => ({
  type: UPDATE_COORDINATS,
  top: top,
  left: left
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
});
