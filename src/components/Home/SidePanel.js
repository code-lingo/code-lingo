import React, { Fragment } from 'react'

//calc the score of the first level
//if the score is <= 80% continue to next level or replay
//else replay or exit (to home page)

export const SidePanel = () => {
  const level = 'Level 2'
  const score = 100

  return (
    <div>
      <div id='side-panel'>
        <h3>Current Level:</h3>
        <p id='side-panel-level'>{level}</p>
        <h3>Total Score:</h3>
        <p>{score}</p>
      </div>
      {/* <div id="leader-board">
        <p>Leaderboard coming!</p>
      </div> */}
    </div>
  )
}
