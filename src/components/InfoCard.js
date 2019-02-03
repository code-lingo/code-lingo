import React from 'react';
import QuestionCreator from './QuestionCreator';
import { InfoFeedback } from './InfoFeedback';

const InfoCard = props => {
  const question = props.question;
  // const answers = Object.values(question).filter(a =>
  //   a.hasOwnProperty('isCorrect')
  // )

  return (
    <div className='card question'>
      <div>{question.description}</div>
      <div style={{ visibility: props.visibility }}>
        <InfoFeedback />
      </div>
      {props.visibility === 'hidden' ? (
        <button onClick={props.handleCheckAnswer}>Run</button>
      ) : (
        <button onClick={props.handleSubmit}>Continue</button>
      )}
    </div>
  );
};

export default QuestionCreator(InfoCard);
