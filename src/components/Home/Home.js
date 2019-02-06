import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { SidePanel } from './SidePanel';
import { fetchCurrentLevel } from '../../store/reducers/currentLevel';

class Home extends Component {
  async componentDidMount() {
    const userId = this.props.currentUser;

    if (userId) {
      this.props.getLevel(userId);
    }
  }

  componentDidUpdate() {
    const userId = this.props.currentUser;
    this.props.getLevel(userId);
  }

  render() {
    if (!this.props.currentUser && this.props.isAuthorized === false) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home">
        <div id="skill-tree" className="card">
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
          <div className="level-selector">
            <Link to="/questions/4">
              <img
                className="game-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/1024px-Circle-icons-computer.svg.png"
                alt="Level Four"
              />{' '}
            </Link>
            <Link to="/questions/4">
              <h3>Level Four</h3>
            </Link>
          </div>
        </div>
        <div id="side-panel">
          <SidePanel />
        </div>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
  isAuthorized: state.isAuthorized,
  currentLevel: state.currenLevel,
});

const mapDispatchToProps = dispatch => {
  return {
    getLevel: user => dispatch(fetchCurrentLevel(user)),
  };
};

export default connect(
  mapToState,
  mapDispatchToProps
)(Home);
