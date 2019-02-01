import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';
import Home from './components/Home/Home';

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
            <Route path="/questions/:levelId" component={Question} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
