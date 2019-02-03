import React from 'react';

export const Feedback = ({ answer }) => {
  return (
    <div>
      {answer.isCorrect ? (
        <div id="green-feedback">
          <h3>Great Job! You are Correct!</h3>
          <p>{answer.val} is the correct answer!!</p>
        </div>
      ) : (
        <div id="red-feedback">
          <h3>Oops, not quite.</h3>
          <p>Try again next time!</p>
        </div>
      )}
    </div>
  );
};
