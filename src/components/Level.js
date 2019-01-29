import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLevelQuestions } from '../store';
import Question from './Question';

class Level extends Component {

  componentDidMount() {
    this.props.getQuestions('level1');
  }

  render () {
    // console.log("PROPS", this.props)

    if (!this.props) {
      return null
    }

    return (
      <Question questions={this.props.questions}/>)
  }

}

const mapStateToProps = state => {
  return {
    questions: state.currentLevelQuestions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: level => dispatch(fetchLevelQuestions(level)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
