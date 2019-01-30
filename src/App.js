import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { auth } from './configs/firebase_init';
import { connect } from 'react-redux';
import { getCurrentUser } from './store';

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';
import Home from './components/Home';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid);
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
  getUser: user => dispatch(getCurrentUser(user)),
});

export default withRouter(
  connect(
    mapToState,
    mapToDispatch
  )(App)
);
