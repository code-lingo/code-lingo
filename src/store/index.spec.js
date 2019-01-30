'use strict';
import GET_CURRENT_LEVEL_QUESTIONS from './index';
import reducer from './index';
import getLevelQuestions from './index';

// Assertions
const chai = require('chai');
const expect = chai.expect;

// Redux

const dataFromFirebase = {
  question1: {
    answer1: {
      isCorrect: true,
      val: 'let x = "banana"',
    },
    answer2: {
      isCorrect: false,
      val: 'let x = banana',
    },
    answer3: {
      isCorrect: false,
      val: 'let x = true',
    },
    description: 'Which of the following is an example of a string?',
    id: 1,
    type: 'multipleChoice',
  },
  question2: {
    answer1: {
      isCorrect: false,
      val: 5,
    },
    answer2: {
      isCorrect: false,
      val: 7,
    },
    answer3: {
      isCorrect: true,
      val: 9,
    },
    description: '"What does this program output? \tconsole.log(3 * (2+1))"',
    id: 2,
  },
};

describe('Store', () => {
  describe('Store / Redux stuff', () => {
    describe('Logic in our Fetch Questions Thunk', () => {
      it('converts nested object to an array with 2 elements', () => {
        const result = Object.keys(dataFromFirebase)
          .map(el => dataFromFirebase[el])
          .sort((a, b) => a.id - b.id);

        expect(result).to.have.length(2);
      });
    });

    describe('Reducer', () => {
      const initialState = {
        currentLevelQuestions: {},
        currentUser: '',
      };

      const newState = reducer(initialState, {
        type: GET_CURRENT_LEVEL_QUESTIONS,
        level: 'level1',
      });

      it('returns a new state with questions fetched from "database" ', () => {
        expect(newState.currentLevelQuestions).to.have.length(2);
      });
    });

    it('returns a new state with the updated `questions`', () => {
      // this should have changed:
      expect(newState.campuses).to.deep.equal(campuses);
      // this should not have changed:
      expect(newState.selectedCampus).to.equal(initialState.selectedCampus);
      expect(newState.students).to.equal(initialState.students);
    });

    it('does not modify the previous state', () => {
      expect(initialState).to.deep.equal({
        campuses: [],
        selectedCampus: {},
        students: [],
      });
    });
  });
});
