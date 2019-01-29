import React from 'react'

const Form = QuestionType => {
  return class Form extends React.Component {
    constructor() {
      super()
      this.state = {
        answer: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleChange(evt) {
      this.setState({
        answer: evt.target.value
      })
    }

    handleSubmit(evt) {
      evt.preventDefault()
      this.props.answerQuestion(this.state.answer)
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

export default Form
