import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    console.log('COMING FROM HOME');
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App">
        <h1>You've reached the Home Component</h1>
        <Link to="/questions">Want to start playing? Click here!</Link>
      </div>
    );
  }
}

const mapToState = state => ({
  currentUser: state.currentUser,
});

export default connect(mapToState)(Home);
