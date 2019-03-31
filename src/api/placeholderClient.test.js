import axios from 'axios'

import { fetchAlbums } from './placeholderClient'
import { fetchPhotos } from './placeholderClient'

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

    axios.get.mockReturnValue(data)
    const albums = fetchAlbums(20, 30)

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

    axios.get.mockReturnValue(data)
    const photos = fetchPhotos(20, 30, 5)

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?albumId=5&_start=20&_limit=30'
    )
    expect(photos).toEqual(data)
  })
})
