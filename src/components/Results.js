import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeaderboardScore } from '../store';

class Results extends Component {
  componentDidMount() {
    this.props.addLeaderboardScore(
      this.props.currentUser,
      this.props.correctAnswers.length,
      1
    );
  }

  render() {
    const { totalAnswers, correctAnswers } = this.props;
    return (
      <div className='card question'>
        <h2>Great Job!</h2>
        <h3>
          Your score is {correctAnswers.length}/{totalAnswers.length}
        </h3>
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
