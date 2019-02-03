const GET_CURRENT_USER = 'GET_CURRENT_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

export const getCurrentUser = uid => ({
  type: GET_CURRENT_USER,
  uid,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const currentUser = (state = '', action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.uid;
    case LOG_OUT_USER:
      return '';
    default:
      return state;
  }
};
