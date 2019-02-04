import React, { Fragment } from 'react';
import QuestionCreator from './QuestionCreator';
import { Feedback } from './Feedback';
import Highlight from 'react-highlight';

const MultipleChoice = props => {
  const question = props.question;
  const answers = Object.values(question).filter(a =>
    a.hasOwnProperty('isCorrect')
  );
  return (
    <div>
      <div>{question.description}</div>
      {question.snippet ? (
        <Fragment>
          <Highlight language="javascript">{question.snippet}</Highlight>
          <div>
            {answers.map((el, index) => {
              return (
                <div key={index}>
                  <button
                    className="answer-option"
                    onClick={() => props.handleChange(el)}
                  >
                    {el.val}
                  </button>
                </div>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <div>
          {answers.map((el, index) => {
            return (
              <div key={index}>
                <button
                  className="answer-option"
                  onClick={() => props.handleChange(el)}
                >
                  <Highlight language="javascript">{el.val}</Highlight>
                </button>
              </div>
            );
          })}
        </div>
      )}
      {/* <div>
        {answers.map((el, index) => {
          return (
            <div key={index}>
              <button
                className="answer-option"
                onClick={() => props.handleChange(el)}
              >
                <Highlight language="javascript">{el.val}</Highlight>
              </button>
            </div>
          );
        })}
      </div> */}
      <div className="border-top" />
      <div className="question-submit">
        {props.visibility === 'hidden' ? (
          <button
            disabled={
              props.selectedAnswer.hasOwnProperty('isCorrect') ? false : true
            }
            onClick={props.handleCheckAnswer}
          >
            Check
          </button>
        ) : (
          <button onClick={props.handleSubmit}>Continue</button>
        )}
      </div>
      <div style={{ visibility: props.visibility }}>
        <Feedback answer={props.selectedAnswer} />
      </div>
    </div>
  );
};

export default QuestionCreator(MultipleChoice);
