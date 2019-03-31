import axios from 'axios'

export function fetchAlbums(start, limit) {
  return axios.get(
    `https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`
  )
}
