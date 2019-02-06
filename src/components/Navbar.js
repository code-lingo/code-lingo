import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../configs/firebase_init'
import { logOutUser } from '../store/reducers/currentUser'
import { authorizedUser } from '../store/reducers/isAuthorized'

export class Navbar extends Component {
  async handleSignOut() {
    try {
      await auth.signOut()
      this.props.logOutUser()
      this.props.authorizedUser(false)
    } catch (error) {
      console.log('ERROR:', error)
    }
  }
  render() {
    return (
      <nav>
        <div id="title">
          <NavLink className="navbar-item active" to={'/'}>
            <div className="navbar-headline">
              <img
                className="navbar-image"
                src={'https://i.imgur.com/OwXBmSd.png'}
                alt={'logo'}
              />
              <h1>Codelingo</h1>
            </div>
          </NavLink>
        </div>
        {!this.props.currentUser ? (
          <div>
            <NavLink className="navbar-item" to={'/login'}>
              <h2>Login</h2>
            </NavLink>
            <NavLink className="navbar-item" to={'/signup'}>
              <h2>SignUp</h2>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="navbar-item">
              <h2 onClick={this.handleSignOut.bind(this)}>SignOut</h2>
            </NavLink>
          </div>
        )}
      </nav>
    )
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
  isAuthorized: state.isAuthorized
})

const mapToDispatch = {
  logOutUser,
  authorizedUser
}

export default connect(
  mapToState,
  mapToDispatch
)(Navbar)
