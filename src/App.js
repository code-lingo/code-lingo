import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { auth } from './configs/firebase_init';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard';
import { NoMatch } from './components/NoMatch';

import { getCurrentUser } from './store';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="App-main ">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            <Route path="/questions/:levelId" component={Question} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route component={NoMatch} />
          </Switch>
        </div>
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

export default withRouter(
  connect(
    mapToState,
    mapToDispatch
  )(App)
);
