import { database } from '../../configs/firebase_init';
import { isYesterday, isToday } from '../utils';

const GET_CURRENT_STREAK = 'GET_CURRENT_STREAK';

const getCurrentStreak = streak => ({
  type: GET_CURRENT_STREAK,
  streak,
});

export const fetchCurrentStreak = userId => {
  return async dispatch => {
    try {
      const user = database.ref('users/').child(userId);

      await user.once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const streak = data.streak;

          dispatch(getCurrentStreak(streak));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const calculateCurrentStreak = userId => {
  return async dispatch => {
    try {
      const user = database.ref('users/').child(userId);

      await user.once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          console.log('data', data);
          const streak = data.streak;
          console.log('streak ', streak);
          const lastPlayed = data.lastPlayed;
          if (lastPlayed === undefined) {
            const today = new Date();
            user.set({ streak: 1, lastPlayed: JSON.stringify(today) });
          } else {
            console.log('lastPlayed', lastPlayed);
            const playedYesterday = isYesterday(lastPlayed);
            const playedToday = isToday(lastPlayed);
            console.log('did I play yesterday?', playedYesterday);
            if (playedYesterday) {
              user.update({ streak: streak + 1 });
            } else if (playedToday) {
              user.update({ streak: streak });
            } else {
              user.update({ streak: 0 });
            }
          }

          const today = new Date();
          user.update({ lastPlayed: JSON.stringify(today) });

          dispatch(getCurrentStreak(streak));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const streak = (state = '', action) => {
  switch (action.type) {
    case GET_CURRENT_STREAK:
      return action.streak;
    default:
      return state;
  }
};
