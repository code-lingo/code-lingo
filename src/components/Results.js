import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeaderboardScore } from '../store/reducers/userScore';
import { calculateCurrentStreak } from '../store/reducers/streak';

import { Link } from 'react-router-dom';

class Results extends Component {
  componentDidMount() {
    this.props.addLeaderboardScore(
      this.props.currentUser,
      this.props.correctAnswers.length,
      this.props.levelId
    );

    this.props.calculateCurrentStreak(this.props.currentUser);
  }

  render() {
    const { totalAnswers, correctAnswers } = this.props;
    const score = `${correctAnswers.length} / ${totalAnswers.length}`;
    const percentage = `${correctAnswers.length / totalAnswers.length}`;

    return (
      <div className="card question">
        <h3>Your score is {score}</h3>
        <div className="border-top" />
        {percentage < 0.75 ? (
          <div>
            <img
              src="https://media.giphy.com/media/wKFY1XaNEainm/giphy.gif"
              alt="questioning cat"
            />
            <Link className="question-submit" to={`/`}>
              <button type="submit">Try Again!</button>
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <img
              src="https://media.giphy.com/media/3o85g2SLLmkp9oyjle/giphy.gif"
              alt="rolling dude"
            />
            <Link className="question-submit" to={`/`}>
              <button type="submit">You're on a roll!</button>
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
});

const mapDispatch = {
  addLeaderboardScore,
  calculateCurrentStreak,
};

export default connect(
  mapState,
  mapDispatch
)(Results);
