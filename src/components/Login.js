<<<<<<< HEAD
import React from 'react';
import { f, auth } from '../configs/firebase_init';
import { connect } from 'react-redux';
import { getCurrentUser, authorizedUser } from '../store';
import { Link } from 'react-router-dom';
=======
import React from 'react'
import { f, auth, database } from '../configs/firebase_init'
import { connect } from 'react-redux'
import { getCurrentUser } from '../store'
import { Link } from 'react-router-dom'
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463

export class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

<<<<<<< HEAD
=======
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid)
        this.props.history.push('/')
      }
    })
  }

>>>>>>> e7104adc70b5c44d934a0822a04541989881a463
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleLogin(event) {
    const { email, password } = this.state
    event.preventDefault()
    try {
<<<<<<< HEAD
      await auth.setPersistence(f.auth.Auth.Persistence.LOCAL);
      const validUser = await auth.signInWithEmailAndPassword(email, password);
      this.props.getCurrentUser(validUser.user.uid);
      this.props.authorizedUser(true);
      this.props.history.push('/');
=======
      await auth.setPersistence(f.auth.Auth.Persistence.LOCAL)
      const validUser = await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: '' })
      database
        .ref('users/')
        .child(validUser.user.uid)
        .once('value', snapshot => {
          console.log(snapshot.val())
        })
      this.props.getUser(validUser.user.uid)
      console.log('valid user', validUser)
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463
    } catch (error) {
      this.setState({
        email: '',
        password: '',
        errorMessage:
<<<<<<< HEAD
          'Sorry, it looks like the Username and/or Password you provided does not match our records',
      });
=======
          'Email or Password is incorrect, please try logging in again'
      })
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463
    }
  }

  render() {
    return (
      <div className='card form'>
        <h1 className='auth-method card-header'>Login</h1>
        {this.state.errorMessage && (
          <p className='auth-error-message'>{this.state.errorMessage}</p>
        )}
<<<<<<< HEAD
        <form className="auth-form" onSubmit={this.handleLogin}>
          <label className="auth-label">Email:</label>
          <input
            required
            className="auth-input"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Input your email"
          />

          <label className="auth-label">Password:</label>
          <input
            required
            className="auth-input"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Input your password"
          />

          <button className="auth-button" type="submit">
=======
        <form className='auth-form' onSubmit={this.handleLogin}>
          <label className='auth-label'>
            <input
              required
              className='auth-input'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              placeholder='Email'
            />
          </label>
          <label className='auth-label'>
            <input
              required
              className='auth-input'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              placeholder='Password'
            />
          </label>
          <button className='auth-button' type='submit'>
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463
            Login
          </button>
        </form>
        <Link className='auth-redirect-link form-message' to='/signup'>
          <p>Don't have an account? Sign Up here!</p>
        </Link>
      </div>
    )
  }
}

const mapToState = state => ({
  currentUser: state.currentUser
})

<<<<<<< HEAD
const mapToDispatch = {
  getCurrentUser,
  authorizedUser,
};
=======
const mapToDispatch = dispatch => ({
  getUser: id => dispatch(getCurrentUser(id))
})
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463

export default connect(
  mapToState,
  mapToDispatch
)(Login)
