import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchLevelQuestions } from '../store';

export default class MultipleChoice extends Component {
  constructor() {
    super();
    this.state = {
      selectedAnswer: {}
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  selectAnswer(answer) {
    const selectedAnswer = answer;
    this.setState({ selectedAnswer });
  }

  submitAnswer() {
    // TODO: when user clicks continue, we render the next question
    if (this.state.selectedAnswer.isCorrect) {
      console.log('you got it right!');
    } else {
      console.log('womp womp!');
    }
  }

  // TODO: update users progress
  // isLevelComplete() {
  // const userId = this.props.currentUser
  // database.ref('users/' + userId + '/progress')
  // }

  render() {

    const question = this.props.question

    const answers = Object.values(question)
      .filter(a => a.hasOwnProperty('isCorrect'));

    return (
      <div>
        <div>{question.description}</div>
        <div>
          {answers.map((el, index) => {
            return (
              <div key={index}>
                <button onClick={() => this.selectAnswer(el)}>{el.val}</button>
              </div>
            );
          })}
        </div>
        <button
          disabled={
            this.state.selectedAnswer.hasOwnProperty('isCorrect') ? false : true
          }
          onClick={this.props.answerQuestion}
        >
          Continue
        </button>
      </div>
    );
  }
}


