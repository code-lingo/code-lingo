import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLeaderboardScore } from '../store/reducers/userScore'

class Results extends Component {
  componentDidMount() {
    this.props.addLeaderboardScore(
      this.props.currentUser,
      this.props.correctAnswers.length
    )
  }

  render() {
    const { totalAnswers, correctAnswers } = this.props
    console.log('LEVEL ID', this.props.match.params.levelId)
    return (
      <div className="card question">
        <h2>Great Job!</h2>
        <h3>
          Your score is {correctAnswers.length}/{totalAnswers.length}
        </h3>
        <h4>
          <Link to={'/'}>Home</Link>
        </h4>
        {/* <h4>
          <Link>Try Again</Link>
        </h4>
        <h4>
          <Link>Next Level</Link>
        </h4> */}
      </div>
    )
  }
}

const mapState = (state, { match }) => ({
  currentUser: state.currentUser,
  currentLevel: state.currentLevel
})

const mapDispatch = {
  addLeaderboardScore
}

export default connect(
  mapState,
  mapDispatch
)(Results)
