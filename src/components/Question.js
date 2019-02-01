import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLevelQuestions } from '../store'
import MultipleChoice from './MultipleChoice'
import ProgressBar from './ProgressBar/ProgressBar'
import InfoCard from './InfoCard'
import Results from './Results'
import { database } from '../configs/firebase_init'

class Question extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: 0,
      answers: [],
      percentage: 0
    }
    this.answerQuestion = this.answerQuestion.bind(this)
  }

  componentDidMount() {
    const levelId = this.props.match.params.levelId
    this.props.getQuestions(levelId)
  }

  answerQuestion(answer) {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      answers: [...this.state.answers, answer],
      percentage: this.state.percentage + 20
    })
  }

  render() {
    const questions = this.props.questions
    const question = questions[this.state.currentQuestion]
    const answers = this.state.answers

    if (answers.length === questions.length) {
      return <Results answers={answers} />
    } else if (
      typeof question === 'object' &&
      (question.type === 'multipleChoice' || question.type === 'trueOrFalse')
    ) {
      return (
        <div>
          <ProgressBar progress={this.state.percentage} />
          <MultipleChoice
            question={question}
            answerQuestion={this.answerQuestion}
          />
        </div>
      )
    } else if (typeof question === 'object' && question.type === 'infoCard') {
      return (
        <div>
          <ProgressBar progress={this.state.percentage} />
          <InfoCard question={question} answerQuestion={this.answerQuestion} />
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    questions: state.currentLevelQuestions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: level => dispatch(fetchLevelQuestions(level))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
