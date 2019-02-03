import React, { Component } from 'react';
<<<<<<< HEAD
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { auth } from './configs/firebase_init';
import { connect } from 'react-redux';
=======
import { Route, Switch } from 'react-router-dom';
>>>>>>> e7104adc70b5c44d934a0822a04541989881a463

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard';
import { NoMatch } from './components/NoMatch';

import { getCurrentUser, authorizedUser } from './store';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.getCurrentUser(user.uid);
        this.props.authorizedUser(true);
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

const mapToDispatch = {
  getCurrentUser,
  authorizedUser,
};

export default withRouter(
  connect(
    mapToState,
    mapToDispatch
  )(App)
);
