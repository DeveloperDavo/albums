import { RECEIVE_ALBUMS, REQUEST_ALBUMS, FETCH_ALBUMS_FAILURE } from './actions'

const initialState = {
  albums: [],
  error: false,
  loading: false
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALBUMS:
      return { ...state, error: false, loading: true }
    case RECEIVE_ALBUMS:
      return { ...state, albums: action.albums, error: false, loading: false }
    case FETCH_ALBUMS_FAILURE:
      return { ...state, albums: null, error: true, loading: false }
    default:
      return state
  }
}
