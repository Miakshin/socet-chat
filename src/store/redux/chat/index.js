import {
  UPDATE_COORDINATS,
  CLOSE_MODAL,
} from './constants';

const initialState = {
  top: '99999',
  left: '99999',
  isOpened: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COORDINATS:
      return {
        top: action.top,
        left: action.left,
        isOpened: true
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};
