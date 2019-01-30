import React from 'react'

const QuestionCreator = (OtherComponent) => {
  return class Form extends React.Component {
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
      this.setState({
        selectedAnswer: {}
      })
    }

    render() {
      return (
        <OtherComponent
          {...this.props}
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}

export default QuestionCreator
