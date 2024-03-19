import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  username: "",
  auth: localStorage.getItem('auth') === 'true',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload,
        auth: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        username: "",
        auth: false,
      };
    default:
      return state;
  }
};

export default userReducer;