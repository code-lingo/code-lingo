import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import { Route, Switch, Link } from 'react-router-dom';
import { f } from './configs/firebase_init';
=======
import { Route, Switch } from 'react-router-dom';
>>>>>>> fa36ba2ffa4554dd409360d6be334b43c00abc0d

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
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
