import { createStore, combineReducers, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import { currentLevelQuestions } from './reducers/currentLevelQuestions';
import { currentUser } from './reducers/currentUser';
import { userScore } from './reducers/userScore';
import { leaderboard } from './reducers/leaderboard';
import { isAuthorized } from './reducers/isAuthorized';

export const rootReducer = combineReducers({
  currentLevelQuestions,
  currentUser,
  userScore,
  leaderboard,
  isAuthorized,
});

export default createStore(
  rootReducer,
  applyMiddleware(ThunkMiddleware, loggingMiddleware)
);
