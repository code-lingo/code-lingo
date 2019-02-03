import React from 'react'
import Leaderboard from '../Leaderboard'

export const SidePanel = () => {
  const level = 'Level 2'
  const score = 100

  return (
    <div id='sidebar'>
      <div id='user-score' className='card'>
        <h3>Current Level:</h3>
        <p id='side-panel-level'>{level}</p>
        <h3>Total Score:</h3>
        <p>{score}</p>
      </div>
      <Leaderboard />
    </div>
  )
}
