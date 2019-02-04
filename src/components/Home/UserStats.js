import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentLevel } from '../../store/reducers/currentLevel';
import { fetchScoreFromLeaderboard } from '../../store/reducers/userScore';

class UserStats extends Component {
  componentDidMount() {
    const userId = this.props.currentUser;
    this.props.fetchCurrentLevel(userId);
    this.props.fetchScoreFromLeaderboard(userId);
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
        <h1 className="card-header">Stats</h1>
        <h3>Current Level:</h3>
        <p id="side-panel-level">{this.props.currentLevel}</p>
        <h3>Total Score:</h3>
        <p>{this.props.userScore}</p>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
  currentLevel: state.currentLevel,
  userScore: state.userScore,
});

const mapDispatch = {
  fetchCurrentLevel,
  fetchScoreFromLeaderboard,
};

export default connect(
  mapToState,
  mapDispatch
)(UserStats);
