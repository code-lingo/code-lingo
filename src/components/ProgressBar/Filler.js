import React from 'react'

export const Filler = props => {
  return <div className="filler" style={{ width: `${props.progress}%` }} />
}

export default Filler
