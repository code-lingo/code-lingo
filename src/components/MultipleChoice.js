import React from 'react';
import QuestionCreator from './QuestionCreator';
import { Feedback } from './Feedback';

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
      <div style={{ visibility: props.visibility }}>
        <Feedback answer={props.selectedAnswer} />
      </div>
      {props.visibility === 'hidden' ? (
        <div>
          <button
            disabled={
              props.selectedAnswer.hasOwnProperty('isCorrect') ? false : true
            }
            onClick={props.handleCheckAnswer}
          >
            Check
          </button>
        </div>
      ) : (
        <button onClick={props.handleSubmit}>Continue</button>
      )}
    </div>
  );
};

export default QuestionCreator(MultipleChoice);
