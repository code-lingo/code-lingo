import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLeaderboardScore } from '../store/reducers/userScore'
import { Link } from 'react-router-dom'

class Results extends Component {
  componentDidMount() {
    this.props.addLeaderboardScore(
      this.props.currentUser,
      this.props.correctAnswers.length
    )
  }

  render() {
    const { totalAnswers, correctAnswers } = this.props
    console.log(this.props)
    return (
      <div className="card question">
        <h2>Great Job!</h2>
        <h3>
          Your score is {correctAnswers.length}/{totalAnswers.length}
        </h3>
        <h3>
          <Link to={'/'}>Return to Home</Link>
        </h3>
        {/* <h3>
          <Link to={`/${nextLevel}`}>Go to the next level!</Link>
        </h3> */}
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser
})

const mapDispatch = {
  addLeaderboardScore
}

export default connect(
  mapState,
  mapDispatch
)(Results)
