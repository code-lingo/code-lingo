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
        <h2 className="card-header">Leaderboard</h2>
        <table id="leaderboard-table">
          <tbody>
            <tr>
              <th>
                <h4>Rank</h4>
              </th>
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
