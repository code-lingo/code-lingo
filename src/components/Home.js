import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home">
        <div id="skill-tree">
          <div id="level-selector">
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
          <div className="level-selector">
            <Link to="/questions/level2">
              <img
                className="game-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
                alt="Level One"
              />{' '}
            </Link>
            <Link to="/questions/level2">
              <h3>Level Two</h3>
            </Link>
          </div>
          <div className="level-selector">
            <Link to="/questions/level3">
              <img
                className="game-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
                alt="Level One"
              />{' '}
            </Link>
            <Link to="/questions/level3">
              <h3>Level Three</h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
});

export default connect(mapToState)(Home);
