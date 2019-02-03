<<<<<<< HEAD
import React from 'react';
import { auth, database } from '../configs/firebase_init';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser, authorizedUser } from '../store';
=======
import React from 'react'
import { auth, database } from '../configs/firebase_init'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser } from '../store'
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
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

  createUser = (userObj, email, username) => {
    const newUser = {
      username,
      email,
      currentLevel: 1
    }

    database
      .ref('users/')
      .child(userObj.uid)
      .set(newUser, error => {
        if (error) {
          console.log('Unable to add user as a member')
        } else {
          console.log('Succesfully added as a Codelingo member!')
        }
      })
  }

  async handleSignUp(event) {
    const { username, email, password } = this.state
    event.preventDefault()
    try {
      const validUser = await auth.createUserWithEmailAndPassword(
        email,
        password
<<<<<<< HEAD
      );
      await this.createUser(validUser.user, email, username);
      this.props.getCurrentUser(validUser.user.uid);
      this.props.authorizedUser(true);
      this.props.history.push('/');
=======
      )
      await this.createUser(validUser.user, email, username)
      this.props.getUser(validUser.user.uid)
      this.setState({ username: '', email: '', password: '' })
      this.props.history.push('/')
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463
    } catch (error) {
      console.log('Error', error)
      this.setState({
        username: '',
        email: '',
        password: '',
<<<<<<< HEAD
        errorMessage:
          'Sorry, it looks like the Username and/or Password you provided does not match our records',
      });
=======
        errorMessage: error.message
      })
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463
    }
  }

  render() {
    return (
      <div className='card form'>
        <h1 className='auth-method card-header'>Sign Up</h1>
        {this.state.errorMessage && (
          <p className='auth-error-message'>{this.state.errorMessage}</p>
        )}
        <form className='auth-form' onSubmit={this.handleSignUp}>
          <label className='auth-label'>
            <input
              required
              className='auth-input'
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              placeholder='Username'
            />
          </label>
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
            Sign Up
          </button>
        </form>
        <Link className='auth-redirect-link form-message' to='/signup'>
          <p>Already have an account? Login here!</p>
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
)(SignUp)
