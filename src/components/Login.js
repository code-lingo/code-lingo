import React from 'react';
import { f, auth } from '../configs/firebase_init';
import { connect } from 'react-redux';
import { getCurrentUser, authorizedUser } from '../store';
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
      <div>
        <h2 className="auth-method">Login</h2>
        {this.state.errorMessage && (
          <p className="auth-error-message">{this.state.errorMessage}</p>
        )}
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
            Login
          </button>
          <Link className="auth-redirect-link" to="/signup">
            Don't have an account, Sign Up here!
          </Link>
        </form>
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
