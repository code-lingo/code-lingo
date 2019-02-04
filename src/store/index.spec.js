import { rootReducer } from './index'

const chai = require('chai')
const expect = chai.expect

const dataFromFirebase = {
  question1: {
    answer1: {
      isCorrect: true,
      val: 'let x = "banana"'
    },
    answer2: {
      isCorrect: false,
      val: 'let x = banana'
    },
    answer3: {
      isCorrect: false,
      val: 'let x = true'
    },
    description: 'Which of the following is an example of a string?',
    id: 1,
    type: 'multipleChoice'
  },
  question2: {
    answer1: {
      isCorrect: false,
      val: 5
    },
    answer2: {
      isCorrect: false,
      val: 7
    },
    answer3: {
      isCorrect: true,
      val: 9
    },
    description: '"What does this program output? \tconsole.log(3 * (2+1))"',
    id: 2
  }
}

const userDataFromFirebase = {
  currentLevel: 2,
  username: '@mcrae'
}

const firebaseLeaderboard = [
  {
    user1: {
      score: 10,
      username: '@camryn'
    },
    user2: {
      score: 20,
      username: '@rhianna'
    },
    user3: {
      score: 400,
      username: '@amanda'
    }
  }
]

describe('Store', () => {
  describe('Store / Redux stuff', () => {
    describe('Logic in our Fetch Questions Thunk', () => {
      it('converts nested object to an array with 2 elements', () => {
        const result = Object.keys(dataFromFirebase)
          .map(el => dataFromFirebase[el])
          .sort((a, b) => a.id - b.id)

        expect(result).to.have.length(2)
      })
    })

    describe('Current Level Questions Reducer', () => {
      const initialState = {
        currentLevelQuestions: [],
        currentUser: ''
      }

      const result = Object.keys(dataFromFirebase)
        .map(el => dataFromFirebase[el])
        .sort((a, b) => a.id - b.id)

      const newState = rootReducer(initialState, {
        type: 'GET_CURRENT_LEVEL_QUESTIONS',
        questions: result
      })

      it('returns a new state with questions fetched from "database" ', () => {
        expect(newState.currentLevelQuestions).to.have.length(2)
      })

      it('returns a new state with the updated `current level questions`', () => {
        expect(newState.currentLevelQuestions).to.deep.equal(result)
        expect(newState.currentUser).to.equal(initialState.currentUser)
      })

      it('does not modify the previous state', () => {
        expect(initialState).to.deep.equal({
          currentLevelQuestions: [],
          currentUser: ''
        })
      })
    })
    describe('Current Level Reducer', () => {
      const initialState = {
        currentLevel: ''
      }
      const result = userDataFromFirebase.currentLevel

      const newState = rootReducer(initialState, {
        type: 'GET_CURRENT_LEVEL',
        level: result
      })
      it('returns a new state with the updated `current level`', () => {
        expect(newState.currentLevel).to.deep.equal(result)
      })

      it('does not modify the previous state', () => {
        expect(initialState).to.deep.equal({
          currentLevel: ''
        })
      })
    })
    describe('Get leaderboard', () => {
      const initialState = {
        leaderboard: []
      }
      const result = firebaseLeaderboard

      const newState = rootReducer(initialState, {
        type: 'GET_LEADERBOARD',
        board: result
      })
      it('returns a new state with the updated `current user`', () => {
        expect(newState.leaderboard).to.deep.equal(result)
      })
      it('returns a new state with leaderboard fetched from "database" ', () => {
        expect(newState.leaderboard).to.have.length(2)
      })

      it('does not modify the previous state', () => {
        expect(initialState).to.deep.equal({
          leaderboard: []
        })
      })
    })
  })
})
