import React from 'react'
import QuestionCreator from './QuestionCreator'
import { Feedback } from './Feedback'

const MultipleChoice = props => {
  const question = props.question
  const answers = Object.values(question).filter(a =>
    a.hasOwnProperty('isCorrect')
  )
  return (
    <div>
      <div>{question.description}</div>
      <div>
        {answers.map((el, index) => {
          return (
            <div key={index}>
              <button
                className='answer-option'
                onClick={() => props.handleChange(el)}
              >
                {el.val}
              </button>
            </div>
          )
        })}
      </div>
      <div className='border-top' />
      <div className='question-submit'>
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
  )
}

export default QuestionCreator(MultipleChoice)
