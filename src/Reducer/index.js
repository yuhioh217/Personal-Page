import { combineReducers } from "redux";
import * as actionTypes from "../Action/types";

const initalUserState = {
  currentUser: null,
  isLoading: true
};

const user_reducer = (state = initalUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer // after you connect to reducer,you can use the state data from "state.user.XXX"
});

export default rootReducer;
