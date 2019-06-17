import { RECEIVE_ALBUMS, REQUEST_ALBUMS } from './actions'

const initialState = {
  loading: false,
  albums: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALBUMS:
      return { ...state, loading: true }
    case RECEIVE_ALBUMS:
      return { ...state, albums: action.albums, loading: false }
    default:
      return state
  }
}
