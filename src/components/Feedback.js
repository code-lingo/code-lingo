import React from 'react'

export const Feedback = ({ answer }) => {
  return (
    <div>
      {answer.isCorrect ? (
        <div id="green-feedback">
          <h3>Great Job!</h3>
          <p>{answer.val} is the correct answer!!</p>
        </div>
      ) : (
        <div id="red-feedback">
          <h3>Oops!</h3>
          <p>Try again next time!</p>
        </div>
      )}
    </div>
  )
}
