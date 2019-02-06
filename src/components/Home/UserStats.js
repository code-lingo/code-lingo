import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentLevel } from '../../store/reducers/currentLevel';
import { fetchScoreFromLeaderboard } from '../../store/reducers/userScore';
import { fetchCurrentStreak } from '../../store/reducers/streak';

class UserStats extends Component {
  componentDidMount() {
    const userId = this.props.currentUser;
    this.props.fetchCurrentLevel(userId);
    this.props.fetchScoreFromLeaderboard(userId);
    this.props.fetchCurrentStreak(userId);
  }

  componentDidUpdate() {
    const userId = this.props.currentUser;

    this.props.fetchCurrentLevel(userId);
    this.props.fetchScoreFromLeaderboard(userId);
  }

  render() {
    if (!this.props.currentLevel.length === 0) {
      return null;
    }

    return (
      <div id="user-score" className="card">
        <h2 className="card-header">Wombat Stats</h2>
        <div className="stats-container">
          <div className="stats">
            <img
              className="stats-icon"
              src="/assets/level_crown.png"
              alt="Star"
            />
            <h3 className="stats-text">Level: </h3>
            <h3 className="stats-text">{this.props.currentLevel}</h3>
          </div>
          <div className="stats">
            <img
              className="stats-icon"
              src="/assets/score_star.png"
              alt="Star"
            />

            <h3 className="stats-text">Score: </h3>
            <h3 className="stats-text">{this.props.userScore}</h3>
          </div>
          <div className="stats">
            <img
              className="stats-icon"
              src="/assets/streak_flame.png"
              alt="Star"
            />
            <h3 className="stats-text">Streak: </h3>{' '}
            <h3 className="stats-text"> {this.props.streak}</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
  currentLevel: state.currentLevel,
  userScore: state.userScore,
  streak: state.streak,
});

const mapDispatch = {
  fetchCurrentLevel,
  fetchScoreFromLeaderboard,
  fetchCurrentStreak,
};

export default connect(
  mapToState,
  mapDispatch
)(UserStats);
