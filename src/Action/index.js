import * as actionType from "./types";

/* User Action */

// Set user
export const setUser = user => {
  return {
    type: actionType.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionType.CLEAR_USER
  };
};

export const setLoading = loading => {
  return {
    type: actionType.SET_LOADING,
    payload: {
      isLoading: loading
    }
  };
};
