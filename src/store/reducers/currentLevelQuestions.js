import { database } from '../../configs/firebase_init';

export const GET_CURRENT_LEVEL_QUESTIONS = 'GET_CURRENT_LEVEL_QUESTIONS';

export const getLevelQuestions = questions => ({
  type: GET_CURRENT_LEVEL_QUESTIONS,
  questions,
});

export const fetchLevelQuestions = levelId => {
  return async dispatch => {
    try {
      database
        .ref('levels/')
        .child(levelId)
        .once('value', snapshot => {
          const exists = snapshot.val() !== null;
          if (exists) {
            let data = snapshot.val();
            const result = Object.keys(data)
              .map(el => data[el])
              .sort((a, b) => a.id - b.id);
            dispatch(getLevelQuestions(result));
          }
        })
        .catch(error => console.log(error));
    } catch (err) {
      console.error(err);
    }
  };
};

export const currentLevelQuestions = (state = [], action) => {
  switch (action.type) {
    case GET_CURRENT_LEVEL_QUESTIONS:
      return action.questions;
    default:
      return state;
  }
};
