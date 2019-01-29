import React from 'react';
import { auth, database } from '../configs/firebase_init';
import { Link } from 'react-router-dom';

export default class SingUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createUser = (userObj, email, username) => {
    const newUser = {
      username,
      email,
    };

    database
      .ref('users/')
      .child(userObj.uid)
      .set(newUser, error => {
        if (error) {
          console.log('Unable to add user as a member');
        } else {
          console.log('Succesfully added as a Codelingo member!');
        }
      });
  };

  async handleSignUp(event) {
    const { username, email, password } = this.state;
    event.preventDefault();
    try {
      const validUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.createUser(validUser.user, email, username);
      this.setState({ username: '', email: '', password: '' });
      this.props.history.push('/');
    } catch (error) {
      console.log('Error', error);
      this.setState({
        username: '',
        email: '',
        password: '',
        errorMessage: error.message,
      });
    }
  }
  render() {
    return (
      <div>
        <h2 className="auth-method">Sign Up</h2>
        {this.state.errorMessage && (
          <p className="auth-error-message">{this.state.errorMessage}</p>
        )}
        <form className="auth-form" onSubmit={this.handleSignUp}>
          <label className="auth-label">
            Username:
            <input
              required
              className="auth-input"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Input username"
            />
          </label>
          <label className="auth-label">
            Email:
            <input
              required
              className="auth-input"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Input your email"
            />
          </label>
          <label className="auth-label">
            Password:
            <input
              required
              className="auth-input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Input your password"
            />
          </label>
          <button className="auth-button" type="submit">
            Sign Up
          </button>
          <Link className="auth-redirect-link" to="/signup">
            Already have an account? Login here!
          </Link>
        </form>
      </div>
    );
  }
}
