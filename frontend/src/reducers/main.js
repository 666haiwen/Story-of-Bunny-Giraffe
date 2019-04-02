import {MAIN} from '../const';

const main = (
    state = {
      height:'calc(100vh - ' + MAIN.BOTTOM + 'px)'
    }, action) => {
  switch (action.type) {
    case 'SET_MAIN_HEIGHT':
      return {
        ...state,
        height: action.height
      };
    default:
      return state;
  }
};

export default main;
