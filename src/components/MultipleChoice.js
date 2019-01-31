import React from 'react';
import QuestionCreator from './QuestionCreator';

const MultipleChoice = props => {
  const question = props.question;
  const answers = Object.values(question).filter(a =>
    a.hasOwnProperty('isCorrect')
  );

  return (
    <div>
      <div>{question.description}</div>
      <div>
        {answers.map((el, index) => {
          return (
            <div key={index}>
              <button onClick={() => props.handleChange(el)}>{el.val}</button>
            </div>
          );
        })}
      </div>
      <button
        disabled={
          props.selectedAnswer.hasOwnProperty('isCorrect') ? false : true
        }
        onClick={props.handleCheckAnswer}
      >
        Check
      </button>
      <button
        disabled={
          props.selectedAnswer.hasOwnProperty('isCorrect') ? false : true
        }
        onClick={props.handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};

export default QuestionCreator(MultipleChoice);
