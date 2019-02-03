import React from 'react'
import { f, auth, database } from '../configs/firebase_init'
import { connect } from 'react-redux'
import { getCurrentUser } from '../store'
import { Link } from 'react-router-dom'

class Login extends React.Component {
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

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid)
        this.props.history.push('/')
      }
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleLogin(event) {
    const { email, password } = this.state
    event.preventDefault()
    try {
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
    } catch (error) {
      this.setState({
        email: '',
        password: '',
        errorMessage:
          'Email or Password is incorrect, please try logging in again'
      })
    }
  }

  render() {
    return (
      <div className='card form'>
        <h1 className='auth-method card-header'>Login</h1>
        {this.state.errorMessage && (
          <p className='auth-error-message'>{this.state.errorMessage}</p>
        )}
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

const mapToDispatch = dispatch => ({
  getUser: id => dispatch(getCurrentUser(id))
})

export default connect(
  mapToState,
  mapToDispatch
)(Login)
