import React, { Component } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Question from './components/Question';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <SignUp />
          <Login /> */}
          <Question />
        </header>
      </div>
    );
  }
}

export default App;
