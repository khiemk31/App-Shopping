import {combineReducers} from 'redux';

const initialState = {
  userName: '',
  sessionId: '',
  badge: 3
};

function createReducer(initialState: any, handlers: any) {
  return function reducer(state: any = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const mainReducer = createReducer(initialState, {
  ['SET_STATE'](state: any, action: any) {
    let {type, ...newState} = action;
    return {
      ...state,
      ...newState,
    };
  },
  ['SET_BADGE'](state: any, action: any){
    let {type, ...newState} = action;
    return {
      ...state,
      ...newState,
    };
  }
});


export default mainReducer;
