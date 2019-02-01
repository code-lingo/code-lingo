import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { SidePanel } from './SidePanel';

class Home extends Component {
  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home">
        <div id="skill-tree">
          <div className="level-selector">
            <Link to="/questions/1">
              <img
                className="game-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
                alt="Level One"
              />{' '}
            </Link>
            <Link to="/questions/1">
              <h3>Level One</h3>
            </Link>
          </div>
          <div className="level-selector">
            <Link to="/questions/2">
              <img
                className="game-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
                alt="Level Two"
              />{' '}
            </Link>
            <Link to="/questions/2">
              <h3>Level Two</h3>
            </Link>
          </div>
          <div className="level-selector">
            <Link to="/questions/3">
              <img
                className="game-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
                alt="Level Three"
              />{' '}
            </Link>
            <Link to="/questions/3">
              <h3>Level Three</h3>
            </Link>
          </div>
        </div>
        <div>
          <SidePanel />
        </div>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
});

export default connect(mapToState)(Home);
