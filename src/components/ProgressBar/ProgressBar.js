import React from 'react'
import Filler from './Filler'

export const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <Filler progress={props.progress} />
    </div>
  )
}

export default ProgressBar
