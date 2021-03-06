import { database } from '../../configs/firebase_init';

export const ADD_SCORE_TO_LEADERBOARD = 'ADD_SCORE_TO_LEADERBOARD';
export const GET_SCORE_FROM_LEADERBOARD = 'GET_SCORE_FROM_LEADERBOARD';

export const addScoreLeaderboard = score => ({
  type: ADD_SCORE_TO_LEADERBOARD,
  score,
});

export const getScoreFromLeaderboard = score => ({
  type: GET_SCORE_FROM_LEADERBOARD,
  score,
});

export const fetchScoreFromLeaderboard = userId => {
  return async dispatch => {
    try {
      database
        .ref('leaderboard/')
        .child(userId)
        .on('value', snapshot => {
          if (snapshot.val()) {
            const score = snapshot.val().score;
            dispatch(getScoreFromLeaderboard(score));
          } else {
            dispatch(getScoreFromLeaderboard(0));
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
};

// this only gets called when you earn points (aka when the results component mounts)
export const addLeaderboardScore = (userId, accScore, levelId) => {
  return async dispatch => {
    try {
      const user = database.ref('users/').child(userId);
      let username = '';

      await user.once('value', snapshot => {
        const data = snapshot.val();
        username = data.username;
        const dblevel = data.currentLevel;
        if (dblevel === levelId * 1) {
          user.update({ currentLevel: dblevel + 1 });
        }
      });

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
                username,
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

export const userScore = (state = 0, action) => {
  switch (action.type) {
    case ADD_SCORE_TO_LEADERBOARD:
      return action.score;
    case GET_SCORE_FROM_LEADERBOARD:
      return action.score;
    default:
      return state;
  }
};
