import React from 'react';

const QuestionCreator = OtherComponent => {
  return class Form extends React.Component {
    constructor() {
      super();
      this.state = {
        selectedAnswer: {},
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
      const selectedAnswer = evt;
      this.setState({ selectedAnswer });
    }

    handleCheckAnswer(evt) {
      evt.preventDefault();
      if (this.state.selectedAnswer.isCorrect) {
        // TODO: shows a positive message/feedback for user
        console.log('Your answer is correct');
      } else {
        // TODO: shows a negative message/feedback for user
        console.log('Your answer is incorrect');
      }
      this.props.submitAnswer(this.state.selectedAnswer.isCorrect);
      this.setState({
        selectedAnswer: {},
      });
    }

    handleSubmit(evt) {
      evt.preventDefault();
      if (this.state.selectedAnswer.isCorrect) {
        // TODO: shows a positive message/feedback for user
        console.log('Your answer is correct');
      } else {
        // TODO: shows a negative message/feedback for user
        console.log('Your answer is incorrect');
      }
      this.props.advanceToNextQuestion();
      this.setState({
        selectedAnswer: {},
      });
    }

    render() {
      return (
        <OtherComponent
          {...this.props}
          {...this.state}
          handleChange={this.handleChange}
          handleCheckAnswer={this.handleCheckAnswer}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
};

export default QuestionCreator;
