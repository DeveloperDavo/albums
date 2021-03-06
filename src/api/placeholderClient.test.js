import axios from 'axios'

import { fetchAlbums } from './placeHolderClient'
import { fetchPhotos } from './placeHolderClient'

jest.mock('axios')

describe('placeHolderClient', () => {
  it('fetches albums', () => {
    const data = [
      {
        userId: 1,
        id: 1,
        title: 'quidem molestiae enim'
      },
      {
        userId: 1,
        id: 2,
        title: 'sunt qui excepturi placeat culpa'
      }
    ]
    const props = {
      location: {
        search: '?start=20&limit=30'
      }
    }

    axios.get.mockReturnValue(data)
    const albums = fetchAlbums(props)

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/albums?_start=20&_limit=30'
    )
    expect(albums).toEqual(data)
  })

  it('fetches photos', () => {
    const data = [
      {
        albumId: 5,
        id: 201,
        title:
          'nesciunt dolorum consequatur ullam tempore accusamus debitis sit',
        url: 'https://via.placeholder.com/600/250289',
        thumbnailUrl: 'https://via.placeholder.com/150/250289'
      },
      {
        albumId: 5,
        id: 202,
        title: 'explicabo vel omnis corporis debitis qui qui',
        url: 'https://via.placeholder.com/600/6a0f83',
        thumbnailUrl: 'https://via.placeholder.com/150/6a0f83'
      }
    ]
    const props = {
      location: {
        search: '?start=20&limit=30'
      },
      match: {
        params: {
          albumId: 5
        }
      }
    }

    axios.get.mockReturnValue(data)
    const photos = fetchPhotos(props)

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?albumId=5&_start=20&_limit=30'
    )
    expect(photos).toEqual(data)
  })
})
