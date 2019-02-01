import React, { Component } from 'react'

//calc the score of the first level
//if the score is <= 80% continue to next level or replay
//else replay or exit (to home page)

class Results extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const answers = this.props.answers.filter(answer => answer !== undefined)
    const correctAnswers = answers.filter(answer => answer === true)
    const totalScore = correctAnswers.length
    return (
      <div>
        <h2>Great Job!</h2>
        <h3>
          Your score is {correctAnswers.length}/{answers.length}
        </h3>
        <button>Continue</button>
        <button>Play Again!</button>
      </div>
    )
  }
}

export default Results
