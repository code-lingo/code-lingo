import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { fetchLevelQuestions } from '../store';

export default class MultipleChoice extends Component {
  constructor() {
    super()
    this.state = {
      selectedAnswer: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const selectedAnswer = evt
    this.setState({ selectedAnswer })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.selectedAnswer.isCorrect) {
      console.log('you got it right!');
    } else {
      console.log('womp womp!');
    }
    this.props.answerQuestion(this.state.selectedAnswer.isCorrect)
  }

  render() {
    const question = this.props.question

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
                <button onClick={() => this.handleChange(el)}>{el.val}</button>
              </div>
            )
          })}
        </div>
        <button
          disabled={
            this.state.selectedAnswer.hasOwnProperty('isCorrect') ? false : true
          }
          onClick={this.handleSubmit}
        >
          Continue
        </button>
      </div>
    )
  }
}
