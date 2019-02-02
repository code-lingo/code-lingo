import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

import { database } from '../configs/firebase_init';

export const GET_CURRENT_LEVEL_QUESTIONS = 'GET_CURRENT_LEVEL_QUESTIONS';
export const ADD_SCORE_TO_LEADERBOARD = 'ADD_SCORE_TO_LEADERBOARD';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';
const GET_LEADERBOARD = 'GET_LEADERBOARD';

export const getLevelQuestions = questions => ({
  type: GET_CURRENT_LEVEL_QUESTIONS,
  questions,
});
export const getCurrentUser = uid => ({
  type: GET_CURRENT_USER,
  uid,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const addScoreLeaderboard = score => ({
  type: ADD_SCORE_TO_LEADERBOARD,
  score,
});

const getLeaderBoard = board => ({
  type: GET_LEADERBOARD,
  board,
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

export const addLeaderboardScore = (userId, accScore, currentLevel) => {
  return async dispatch => {
    try {
      // Retrieve the username from 'users' node && update 'currentLevel'
      const user = database.ref('users/').child(userId);
      let username = '';
      await user.once('value', snapshot => {
        const data = snapshot.val();
        username = data.username;
        const level = data.currentLevel;
        if (level === currentLevel) {
          user.update({ currentLevel: level + 1 });
        }
      });
      // Update the user's score on leaderboard
      await database
        .ref('leaderboard/')
        .child(userId)
        .once('value', snapshot => {
          if (snapshot.val()) {
            const currentScore = snapshot.val().score;
            database
              .ref('leaderboard/')
              .child(userId)
              .set({
                score: currentScore + accScore,
              });
          } else {
            database
              .ref('leaderboard/')
              .child(userId)
              .set({
                username,
                score: accScore,
              });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchLeaderBoard = () => {
  return async dispatch => {
    try {
      await database.ref('leaderboard/').on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const board = Object.values(data).sort((a, b) => b.score - a.score);
          dispatch(getLeaderBoard(board));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  currentLevelQuestions: [],
  currentUser: '',
  userScore: 0,
  currentLevel: '',
  leaderboard: [],
};

/**
 * REDUCER
 */

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LEVEL_QUESTIONS:
      return { ...state, currentLevelQuestions: action.questions };
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.uid };
    case LOG_OUT_USER:
      return { ...state, currentUser: '' };
    case ADD_SCORE_TO_LEADERBOARD:
      return { ...state, userScore: action.score };
    case GET_LEADERBOARD:
      return { ...state, leaderboard: action.board };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(ThunkMiddleware, loggingMiddleware)
);
