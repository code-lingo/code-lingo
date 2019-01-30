import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLevelQuestions } from '../store';
import MultipleChoice from './MultipleChoice';

// comment for commit

class Question extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      answers: [],
    };
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions('level1');
  }

  answerQuestion(answer) {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      answers: [...this.state.answers, answer],
    });
  }

  render() {
    const questions = this.props.questions;
    const question = questions[this.state.currentQuestion];

    if (typeof question === 'object' && question.type === 'multipleChoice') {
      return (
        <MultipleChoice
          question={question}
          answerQuestion={this.answerQuestion}
        />
      );
    } else {
      return null;
    }
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
