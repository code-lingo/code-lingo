const AUTH_USER = 'AUTH_USER';

export const authorizedUser = isLoggedIn => ({
  type: AUTH_USER,
  isLoggedIn,
});

export const isAuthorized = (state = false, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.isLoggedIn;
    default:
      return state;
  }
};
