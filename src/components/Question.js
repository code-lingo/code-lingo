import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLevelQuestions } from '../store';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      selectedAnswer: {},
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions('level1');
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
    if (!this.props.questions.question1) {
      return null;
    }
    const question = this.props.questions.question1;
    const answers = Object.keys(question)
      .map(o => question[o])
      .filter(a => a.hasOwnProperty('isCorrect'));

    return (
      <div>
        <div>{this.props.questions.question1.description}</div>
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
          onClick={this.submitAnswer}
        >
          Continue
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.currentLevelQuestions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: level => dispatch(fetchLevelQuestions(level)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
