import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLevelQuestions } from '../store';
import MultipleChoice from './MultipleChoice';
import ProgressBar from './ProgressBar/ProgressBar';
import InfoCard from './InfoCard';
import Results from './Results';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestionIndex: 0,
      answers: [],
      percentage: 0,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.advanceToNextQuestion = this.advanceToNextQuestion.bind(this);
  }

  componentDidMount() {
    const levelId = this.props.match.params.levelId;
    this.props.getQuestions(levelId);
  }

  submitAnswer(answer) {
    this.setState({
      answers: [...this.state.answers, answer],
    });
  }
  advanceToNextQuestion() {
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      percentage: this.state.percentage + 20,
    });
  }

  render() {
    const questions = this.props.questions;
    const question = questions[this.state.currentQuestionIndex];
    const answers = this.state.answers;

    if (questions.length > 0 && questions.length === answers.length) {
      const totalAnswers = answers.filter(answer => answer !== undefined);
      const correctAnswers = answers
        .filter(answer => answer !== undefined)
        .filter(answer => answer === true);
      return (
        <Results correctAnswers={correctAnswers} totalAnswers={totalAnswers} />
      );
    } else if (
      typeof question === 'object' &&
      (question.type === 'multipleChoice' || question.type === 'trueOrFalse')
    ) {
      return (
        <div>
          <ProgressBar progress={this.state.percentage} />
          <MultipleChoice
            question={question}
            submitAnswer={this.submitAnswer}
            advanceToNextQuestion={this.advanceToNextQuestion}
          />
        </div>
      );
    } else if (typeof question === 'object' && question.type === 'infoCard') {
      return (
        <div>
          <ProgressBar progress={this.state.percentage} />
          <InfoCard
            question={question}
            submitAnswer={this.submitAnswer}
            advanceToNextQuestion={this.advanceToNextQuestion}
          />
        </div>
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
