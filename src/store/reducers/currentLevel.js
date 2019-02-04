import { database } from '../../configs/firebase_init';

const GET_CURRENT_LEVEL = 'GET_CURRENT_LEVEL';

const getCurrentLevel = level => ({
  type: GET_CURRENT_LEVEL,
  level,
});

export const fetchCurrentLevel = userId => {
  return async dispatch => {
    try {
      await database
        .ref('users/')
        .child(userId)
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            const level = data.currentLevel;
            dispatch(getCurrentLevel(level));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const currentLevel = (state = '', action) => {
  switch (action.type) {
    case GET_CURRENT_LEVEL:
      return action.level;
    default:
      return state;
  }
};
