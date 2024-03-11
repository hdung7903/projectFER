export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

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