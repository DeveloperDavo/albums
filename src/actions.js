import axios from 'axios'

/* action types */
export const REQUEST_ALBUMS = 'REQUEST_ALBUMS'
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS'

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

export function fetchAlbums() {
  return dispatch => {
    dispatch(requestAlbums())
    const BASE_URL = 'https://jsonplaceholder.typicode.com/'
    const start = 0
    const limit = 50
    return axios
      .get(`${BASE_URL}albums?_start=${start}&_limit=${limit}`)
      .then(response => dispatch(receiveAlbums(response)))
  }
}
