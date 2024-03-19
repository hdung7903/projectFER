import { USER_LOGIN, USER_LOGOUT } from "./types";

export const loginUser = (username) => {
  return {
    type: USER_LOGIN,
    payload: username,
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOGOUT,
  };
};