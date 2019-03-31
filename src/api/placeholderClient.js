import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'

export function fetchAlbums(start, limit) {
  return axios.get(`${BASE_URL}albums?_start=${start}&_limit=${limit}`)
}

export function fetchPhotos(start, limit, albumId) {
  return axios.get(
    `${BASE_URL}photos?albumId=${albumId}&_start=${start}&_limit=${limit}`
  )
}
