import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <ul className="navbar-list">
            <Link className="navbar-item active" to={'/'}>
              Home
            </Link>
            <Link className="navbar-item" to={'/login'}>
              Login
            </Link>
            <Link className="navbar-item" to={'/signup'}>
              SignUp
            </Link>
          </ul>
        </nav>
        <div className="App-main ">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/questions" component={Question} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
