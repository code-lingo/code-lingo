import { createStore, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import { database } from '../config/firebase_config'

const GET_CURRENT_LEVEL_QUESTIONS = 'GET_CURRENT_LEVEL_QUESTIONS'

export const getLevelQuestions = level => ({
  type: GET_CURRENT_LEVEL_QUESTIONS,
  level
})

//THUNK
export const fetchLevelQuestions = levelId => {
  return dispatch => {
    database
      .ref('levels')
      .child(levelId)
      .then(snapshot => {
        const exists = snapshot.val() !== null
        if (exists) {
          let data = snapshot.val()
          //   let results = Object.keys(data).map(key => data[key])
          console.log('DATA TEST QS LVL 1', data)
          dispatch(getLevelQuestions(data))
        }
      })
      .catch(error => console.log(error))
  }
}

const initialState = {
  currentLevelQuestions: {}
}

/**
 * REDUCER
 */

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LEVEL_QUESTIONS:
      return { ...state, currentLevel: action.level }
    default:
      return state
  }
}

export default createStore(user, applyMiddleware(ThunkMiddleware))
