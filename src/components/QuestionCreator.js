import React from 'react';

const QuestionCreator = OtherComponent => {
  return class Form extends React.Component {
    constructor() {
      super();
      this.state = {
        selectedAnswer: {},
        visibility: 'hidden',
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

      this.props.submitAnswer(this.state.selectedAnswer.isCorrect);
      this.setState({
        visibility: 'visible',
      });
    }

    handleSubmit(evt) {
      evt.preventDefault();
      this.props.advanceToNextQuestion();
      this.setState({
        selectedAnswer: {},
        visibility: 'hidden',
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
