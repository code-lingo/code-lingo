import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

class Home extends Component {
  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home">
        <div className="level-selector">
          <Link to="/questions/level1">
            <img
              className="game-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
              alt="Level One"
            />{' '}
          </Link>
          <Link to="/questions/level1">
            <h3>Level One</h3>
          </Link>
        </div>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
});

export default connect(mapToState)(Home);
