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
        <div className="stats">
          <h3 style={{ marginRight: '5px' }}>Current Level: </h3>
          <h3>{this.props.currentLevel}</h3>
        </div>
        <div className="stats">
          <h3 style={{ marginRight: '5px' }}>Total Score: </h3>
          <h3>{this.props.userScore}</h3>
        </div>
        <div className="stats">
          <h3 style={{ marginRight: '5px' }}>Streak: </h3>{' '}
          <h3> {this.props.streak}</h3>
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
