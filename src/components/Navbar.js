import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../configs/firebase_init';
import { logOutUser } from '../store/reducers/currentUser';

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
        <div id="title">
          <h1>Codelingo</h1>
        </div>
        {!this.props.currentUser ? (
          <div>
            <NavLink className="navbar-item active" to={'/'}>
              <h2>Home</h2>
            </NavLink>
            <NavLink className="navbar-item" to={'/login'}>
              <h2>Login</h2>
            </NavLink>
            <NavLink className="navbar-item" to={'/signup'}>
              <h2>SignUp</h2>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink className="navbar-item active" to={'/'}>
              <h2>Home</h2>
            </NavLink>
            <NavLink className="navbar-item" to={'/leaderboard'}>
              <h2>Leaderboard</h2>
            </NavLink>
            <NavLink to="/login" className="navbar-item">
              <h2 onClick={this.handleSignOut.bind(this)}>SignOut</h2>
            </NavLink>
          </div>
        )}
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
