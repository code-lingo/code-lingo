import React from 'react';
import { f, auth } from '../configs/firebase_init';
import { connect } from 'react-redux';
import { getCurrentUser } from '../store/reducers/currentUser';
import { authorizedUser } from '../store/reducers/isAuthorized';
import { Link } from 'react-router-dom';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleLogin(event) {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      await auth.setPersistence(f.auth.Auth.Persistence.LOCAL);
      const validUser = await auth.signInWithEmailAndPassword(email, password);
      this.props.getCurrentUser(validUser.user.uid);
      this.props.authorizedUser(true);
      this.props.history.push('/');
    } catch (error) {
      this.setState({
        email: '',
        password: '',
        errorMessage:
          'Sorry, it looks like the Username and/or Password you provided does not match our records',
      });
    }
  }

  render() {
    return (
      <div className="card form">
        <h1 className="auth-method card-header">Login</h1>
        {this.state.errorMessage && (
          <p className="auth-error-message">{this.state.errorMessage}</p>
        )}
        <form className="auth-form" onSubmit={this.handleLogin}>
          <input
            required
            className="auth-input"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />

          <input
            required
            className="auth-input"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />

          <button className="auth-button" type="submit">
            Login
          </button>
        </form>
        <Link className="auth-redirect-link form-message" to="/signup">
          <p>Don't have an account? Sign Up here!</p>
        </Link>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
});

const mapToDispatch = {
  getCurrentUser,
  authorizedUser,
};

export default connect(
  mapToState,
  mapToDispatch
)(Login);
