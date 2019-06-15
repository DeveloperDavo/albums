import { RECEIVE_ALBUMS } from './actions'

const initialState = {
  albums: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALBUMS:
      return { ...state, albums: action.albums }
    default:
      return state
  }
}
