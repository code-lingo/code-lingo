import React from 'react';
import QuestionCreator from './QuestionCreator';
import { InfoFeedback } from './InfoFeedback';
import Highlight from 'react-highlight';

const InfoCard = props => {
  const question = props.question;

  return (
    <div className="question">
      <div>{question.description}</div>
      {question.snippet ? (
        <Highlight language="javascript">{question.snippet}</Highlight>
      ) : (
        ''
      )}
      <div style={{ visibility: props.visibility }}>
        {question.reveal ? (
          <InfoFeedback reveal={question.reveal} />
        ) : (
          <div className="reveal-info">
            You're one step closer to becoming a top notch programmer!
          </div>
        )}
      </div>
      <div className="border-top" />
      <div className="question-submit">
        {props.visibility === 'hidden' ? (
          <button onClick={props.handleCheckAnswer}>Run</button>
        ) : (
          <button onClick={props.handleSubmit}>Continue</button>
        )}
      </div>
    </div>
  );
};

export default QuestionCreator(InfoCard);
