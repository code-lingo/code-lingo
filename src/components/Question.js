import React, { Component } from 'react';
import { database } from '../configs/firebase_init.js';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      description: 'Which statement evalautes to true?',
      answers: [
        { id: 1, answer: "1 === '1' ", isCorrect: false },
        { id: 2, answer: '1 === 5/5', isCorrect: true },
      ],
      selectedAnswer: {},
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    // THUNK A COMING
  }

  selectAnswer(answer) {
    const selectedAnswer = answer;
    this.setState({ selectedAnswer });
  }

  submitAnswer() {
    if (this.state.selectedAnswer.isCorrect) {
      console.log('you got it right!');
    } else {
      console.log('womp womp!');
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.description}</div>
        <div>
          {this.state.answers.map((el, index) => {
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
          onClick={this.submitAnswer}
        >
          Continue
        </button>
      </div>
    );
  }
}

export default Question;
