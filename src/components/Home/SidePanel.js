import React, { Fragment } from 'react';

//calc the score of the first level
//if the score is <= 80% continue to next level or replay
//else replay or exit (to home page)

export const SidePanel = () => {
  const level = 'Level 2';
  const score = 100;

  return (
    <Fragment>
      <div id="side-panel">
        <div>Current Level: {level}</div>
        <div>Total Score: {score}</div>
      </div>
      <div id="leader-board">
        <p>Leaderboard coming!</p>
      </div>
    </Fragment>
  );
};
