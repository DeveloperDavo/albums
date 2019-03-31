import axios from 'axios'

import { fetchAlbums } from './placeholderClient'

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
})
