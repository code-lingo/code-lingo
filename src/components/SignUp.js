import React from 'react';
import { auth, database } from '../configs/firebase_init';

export default class SingUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
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

  handleSignUp(event) {
    const { username, email, password } = this.state;
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userObj => this.createUser(userObj.user, email, username))
      .catch(error => this.setState({ errorMessage: error.errorMessage }));
  }
  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSignUp}>
          <label>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
