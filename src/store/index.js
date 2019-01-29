import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { database, auth } from '../configs/firebase_init';

const GET_CURRENT_LEVEL_QUESTIONS = 'GET_CURRENT_LEVEL_QUESTIONS';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

export const getLevelQuestions = level => ({
  type: GET_CURRENT_LEVEL_QUESTIONS,
  level,
});
export const getCurrentUser = uid => ({
  type: GET_CURRENT_USER,
  uid,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

//THUNK
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
            console.log(result);
            dispatch(getLevelQuestions(result));
          }
        })
        .catch(error => console.log(error));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  currentLevelQuestions: {},
  currentUser: '',
};

/**
 * REDUCER
 */

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LEVEL_QUESTIONS:
      return { ...state, currentLevelQuestions: action.level };
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.uid };
    case LOG_OUT_USER:
      return { ...state, currentUser: '' };
    default:
      return state;
  }
};

export default createStore(user, applyMiddleware(ThunkMiddleware));
