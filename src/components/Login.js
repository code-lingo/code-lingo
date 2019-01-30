import React from 'react';
import { f, auth } from '../configs/firebase_init';
import { connect } from 'react-redux';
import { getCurrentUser } from '../store';
import { Link } from 'react-router-dom';

class Login extends React.Component {
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
    // f.auth()
    //   .setPersistence(f.auth.Auth.Persistence.LOCAL)
    //   .then(() => {
    //     f.auth()
    //       .signInWithEmailAndPassword(email, password)
    //       .then(validUser => {
    //         console.log('HELLO FROM AUTHENTICATION');
    //         this.setState({ email: '', password: '' });
    //         this.props.getUser(validUser.user.uid);
    //         this.props.history.push('/');
    //       })
    //       .catch(error => console.log('ERROR MESSAGE:', error));
    //   })
    //   .catch(function(error) {
    //     console.log('ERROR MESSAGE:', error);
    //   });

    try {
      await f.auth().setPersistence(f.auth.Auth.Persistence.SESSION);
      console.log('BEFORE USER LOGS IN');
      const validUser = await auth.signInWithEmailAndPassword(email, password);
      console.log('HELLO FROM AUTHENTICATION');
      this.setState({ email: '', password: '' });
      this.props.getUser(validUser.user.uid);
      console.log('HELLO FROM AUTHENTICATION:', validUser.user.uid);
      this.props.history.push('/');
    } catch (error) {
      console.log('USER WAS UNABLE TO SIGN IN', error);
      this.setState({
        email: '',
        password: '',
        errorMessage:
          'Email or Password is incorrect, please try logging in again',
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

const mapToDispatch = dispatch => ({
  getUser: id => dispatch(getCurrentUser(id)),
});

export default connect(
  mapToState,
  mapToDispatch
)(Login);
