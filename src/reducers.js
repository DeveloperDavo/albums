import { FETCH_ALBUMS } from './actions'

const initialState = {
  albums: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALBUMS:
      return { ...state, albums: action.albums }
    default:
      return state
  }
}
