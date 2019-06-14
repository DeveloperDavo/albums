// action types
export const FETCH_ALBUMS = 'FETCH_ALBUMS'

// actions creators
export function fetchAlbums() {
  return {
    type: FETCH_ALBUMS,
    albums: [
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
  }
}
