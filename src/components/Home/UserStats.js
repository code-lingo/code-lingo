import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentLevel } from '../../store/reducers/currentLevel';

class UserStats extends Component {
  componentDidMount() {
    const userId = this.props.currentUser;
    this.props.fetchCurrentLevel(userId);
  }

  componentDidUpdate() {
    const userId = this.props.currentUser;

    this.props.fetchCurrentLevel(userId);
  }

  render() {
    console.log('current level', this.props.currentLevel);
    if (!this.props.currentLevel.length === 0) {
      return null;
    }

    return (
      <div id="user-score" className="card">
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
};

export default connect(
  mapToState,
  mapDispatch
)(UserStats);
