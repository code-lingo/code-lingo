import { database } from '../../configs/firebase_init';

const GET_LEADERBOARD = 'GET_LEADERBOARD';

const getLeaderBoard = board => ({
  type: GET_LEADERBOARD,
  board,
});

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

export const leaderboard = (state = [], action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return action.board;
    default:
      return state;
  }
};
