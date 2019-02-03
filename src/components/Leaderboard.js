import React, { Component } from 'react';
import { fetchLeaderBoard } from '../store';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderBoard(this.props.currentUser);
  }
  render() {
    if (!this.props.leaderboard.length) {
      return null;
    }
    return (
      <div className='card' id='leaderboard' >
        <h1 className='card-header'>Leaderboard</h1>
        <table>
          <tr>
            <th>Programmers</th>
            <th>Rank</th>
          </tr>
          {this.props.leaderboard.map(leader => (
            <tr>
              <td>{leader.username}</td>
              <td>{leader.score}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  leaderboard: state.leaderboard,
});

const mapDispatch = {
  fetchLeaderBoard,
};

export default connect(
  mapState,
  mapDispatch
)(Leaderboard);
