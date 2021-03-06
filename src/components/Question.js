import React, { Component } from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import { fetchLevelQuestions } from '../store/reducers/currentLevelQuestions';
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
      percentage: 5,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.advanceToNextQuestion = this.advanceToNextQuestion.bind(this);
  }

  componentDidMount() {
    const levelId = this.props.match.params.levelId;
    NProgress.start();
    this.props.fetchLevelQuestions(levelId);
    NProgress.done();
  }

  submitAnswer(answer) {
    this.setState({
      answers: [...this.state.answers, answer],
    });
  }
  advanceToNextQuestion() {
    const increment = 95 / this.props.questions.length;

    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      percentage: this.state.percentage + increment,
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
        <Results
          correctAnswers={correctAnswers}
          totalAnswers={totalAnswers}
          levelId={this.props.match.params.levelId}
        />
      );
    } else if (
      typeof question === 'object' &&
      (question.type === 'multipleChoice' ||
        question.type === 'trueOrFalse' ||
        question.type === 'infoCard')
    ) {
      return (
        <div className="card question">
          <ProgressBar progress={this.state.percentage} />
          {question.type === 'infoCard' ? (
            <InfoCard
              question={question}
              submitAnswer={this.submitAnswer}
              advanceToNextQuestion={this.advanceToNextQuestion}
            />
          ) : (
            <MultipleChoice
              question={question}
              submitAnswer={this.submitAnswer}
              advanceToNextQuestion={this.advanceToNextQuestion}
            />
          )}
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

const mapDispatchToProps = {
  fetchLevelQuestions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
