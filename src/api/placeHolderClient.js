import axios from 'axios'
import queryString from 'query-string'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'

export function fetchAlbums(props) {
  const { location } = props
  const { start, limit } = queryString.parse(location.search)
  return axios.get(`${BASE_URL}albums?_start=${start}&_limit=${limit}`)
}

export function fetchPhotos(props) {
  const { location, match } = props
  const { start, limit } = queryString.parse(location.search)
  const albumId = match.params.albumId
  return axios.get(
    `${BASE_URL}photos?albumId=${albumId}&_start=${start}&_limit=${limit}`
  )
}
