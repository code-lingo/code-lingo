import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeaderboardScore } from '../store/reducers/userScore';
import { Link } from 'react-router-dom';

class Results extends Component {
  componentDidMount() {
    console.log('results component DID mount!!!!!');
    this.props.addLeaderboardScore(
      this.props.currentUser,
      this.props.correctAnswers.length,
      this.props.currentLevel
    );
  }

  render() {
    console.log('i am render!  ');
    const { totalAnswers, correctAnswers } = this.props;
    const score = `${correctAnswers.length} / ${totalAnswers.length}`;
    const percentage = `${correctAnswers.length / totalAnswers.length}`;

    return (
      <div className="card question">
        <h3>Your score is {score}</h3>
        {percentage < 0.75 ? (
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
    );
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  currentLevel: state.currentLevel,
});

const mapDispatch = {
  addLeaderboardScore,
};

export default connect(
  mapState,
  mapDispatch
)(Results);
