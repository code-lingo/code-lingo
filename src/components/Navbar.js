import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../configs/firebase_init';
import { logOutUser } from '../store';

export class Navbar extends Component {
  async handleSignOut() {
    try {
      await auth.signOut();
      this.props.logOutUser();
    } catch (error) {
      alert('Something went wrong:', error);
    }
  }
  render() {
    return (
      <nav>
        <ul className="navbar-list">
          {!this.props.currentUser ? (
            <div>
              <NavLink className="navbar-item active" to={'/'}>
                Home
              </NavLink>
              <NavLink className="navbar-item" to={'/login'}>
                Login
              </NavLink>
              <NavLink className="navbar-item" to={'/signup'}>
                SignUp
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink className="navbar-item active" to={'/'}>
                Home
              </NavLink>
              <NavLink className="navbar-item" to={'/leaderboard'}>
                Leaderboard
              </NavLink>
              <NavLink to="/login">
                <button
                  className="navbar-item"
                  onClick={this.handleSignOut.bind(this)}
                >
                  SignOut
                </button>
              </NavLink>
            </div>
          )}
        </ul>
      </nav>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
});

const mapToDispatch = dispatch => ({
  logOutUser: () => dispatch(logOutUser()),
});

export default connect(
  mapToState,
  mapToDispatch
)(Navbar);
