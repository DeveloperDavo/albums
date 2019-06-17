import axios from 'axios'

/* action types */
export const REQUEST_ALBUMS = 'REQUEST_ALBUMS'
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS'
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE'

/* actions creators */
export const requestAlbums = () => ({
  type: REQUEST_ALBUMS
})

function receiveAlbums(response) {
  return {
    type: RECEIVE_ALBUMS,
    albums: response.data
  }
}

export const fetchAlbumsFailure = error => ({
  type: FETCH_ALBUMS_FAILURE,
  error
})

/* async */
export function fetchAlbums(start, limit) {
  return dispatch => {
    dispatch(requestAlbums())
    const BASE_URL = 'https://jsonplaceholder.typicode.com/'
    return axios
      .get(`${BASE_URL}albums?_start=${start}&_limit=${limit}`)
      .then(response => dispatch(receiveAlbums(response)))
      .catch(err => dispatch(fetchAlbumsFailure(err)))
  }
}
