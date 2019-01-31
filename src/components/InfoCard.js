import React from 'react'
import QuestionCreator from './QuestionCreator'

const InfoCard = props => {
  const question = props.question
  // const answers = Object.values(question).filter(a =>
  //   a.hasOwnProperty('isCorrect')
  // )

  return (
    <div>
      <div>{question.description}</div>
      <button onClick={props.handleSubmit}>Continue</button>
    </div>
  )
}

export default QuestionCreator(InfoCard)
