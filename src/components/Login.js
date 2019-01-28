import React from 'react';
import { auth } from '../configs/firebase_init';

export default class SingUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleLogin(event) {
    const { email, password } = this.state;
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(userObj =>
        console.log(
          'This is the user id of successfuly logged in user',
          userObj.user.uid
        )
      )
      .catch(error => this.setState({ errorMessage: error.errorMessage }));
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
