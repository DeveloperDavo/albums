import React from 'react'
import { shallow, mount } from 'enzyme'
import ReactLoading from 'react-loading'

import { ContainerWithAlbums } from './ContainerWithAlbums'
import Albums from './Albums'
import AlbumGridItem from './AlbumGridItem'

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

const defaultProps = {
  albums: data,
  empty: false,
  error: false,
  fetchAlbums: () => {},
  history: {
    push: jest.fn()
  },
  items: data,
  loading: false,
  location: {
    search: '?start=0&limit=20'
  },
  match: { url: '/albums' }
}

describe('ContainerWithAlbums', () => {
  it('renders albums', () => {
    const newLocal = <ContainerWithAlbums {...defaultProps} />
    const wrapper = mount(newLocal)

    expect(wrapper.find('.GridItem').length).toBe(data.length)
  })

  it('renders Loading when loading', () => {
    const wrapper = mount(<ContainerWithAlbums {...defaultProps} loading />)

    expect(wrapper.find(ReactLoading).length).toBe(1)
  })

  it('does not render Loading when not loading', () => {
    const wrapper = mount(<ContainerWithAlbums {...defaultProps} />)

    expect(wrapper.find(ReactLoading).length).toBe(0)
  })
})

xdescribe('ContainerWithAlbums', () => {
  describe('Albums', () => {
    it('navigates to photo when clicked', () => {
      const push = jest.fn()
      const props = { ...defaultProps, history: { push } }
      const wrapper = shallow(<ContainerWithAlbums {...props} />)

      wrapper
        .find(Albums)
        .dive()
        .find(AlbumGridItem)
        .at(0)
        .dive()
        .find('.GridItem')
        .simulate('click')

      expect(push).toHaveBeenCalledWith('/albums/1?start=0&limit=20')
    })

    it('does not render Loading when not loading', () => {
      const wrapper = shallow(<ContainerWithAlbums {...defaultProps} />)

      expect(
        wrapper
          .find(Albums)
          .dive()
          .find(ReactLoading).length
      ).toBe(0)
    })
  })
})
