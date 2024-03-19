import { USER_LOGIN, USER_LOGOUT } from "./types";

export const loginUser = (username) => {
  localStorage.setItem('auth', 'true');
  localStorage.setItem('username', username);
  return {
    type: USER_LOGIN,
    payload: username,
  };
};

export const logoutUser = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('username');
  return {
    type: USER_LOGOUT,
  };
};