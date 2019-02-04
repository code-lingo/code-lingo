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
    const score = `${correctAnswers.length} / ${totalAnswers.length}`

    return (
      <div className="card question">
        <h3>Your score is {score}</h3>
        {correctAnswers.length < 4 ? (
          <div>
            <Link to={`/`}>
              <h3>Try Again!</h3>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={`/`}>
              <h2>You're on a roll!</h2>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({
  currentUser: currentUser
})

const mapDispatch = {
  addLeaderboardScore
}

export default connect(
  mapState,
  mapDispatch
)(Results)
