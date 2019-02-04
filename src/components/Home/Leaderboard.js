import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeaderBoard } from '../../store/reducers/leaderboard';

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderBoard(this.props.currentUser);
  }
  render() {
    if (!this.props.leaderboard.length) {
      return null;
    }
    return (
      <div className="card" id="leaderboard">
        <h1 className="card-header">Leaderboard</h1>
        <table>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Programmers</th>
              <th>Points</th>
            </tr>

            {this.props.leaderboard.map((leader, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{leader.username}</td>
                <td>{leader.score}</td>
              </tr>
            ))}
          </tbody>
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
