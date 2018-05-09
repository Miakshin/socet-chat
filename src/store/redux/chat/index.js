import {
  UPDATE_COORDINATS,
  CLOSE_MODAL,
} from './constants';

const initialState = {
  target: {},
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
        target: action.target,
        isOpened: true,
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};
