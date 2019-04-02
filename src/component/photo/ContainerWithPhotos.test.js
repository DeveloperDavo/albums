import React from 'react'
import { shallow } from 'enzyme'
import ReactLoading from 'react-loading'

import { ContainerWithPhotos } from './ContainerWithPhotos'
import Photos from './Photos'

const data = [
  {
    albumId: 5,
    id: 201,
    title: 'nesciunt dolorum consequatur ullam tempore accusamus debitis sit',
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

const defaultProps = {
  empty: false,
  error: false,
  history: { push: jest.fn() },
  items: data,
  loading: false,
  location: {
    search: '?start=0&limit=20'
  },
  match: { url: '/albums' }
}

describe('ContainerWithPhotos', () => {
  it('renders photos', () => {
    const wrapper = shallow(<ContainerWithPhotos {...defaultProps} loading />)

    expect(wrapper.find(Photos).length).toBe(1)
  })

  it('renders Loading when loading', () => {
    const wrapper = shallow(<ContainerWithPhotos {...defaultProps} loading />)

    expect(
      wrapper
        .find(Photos)
        .dive()
        .find(ReactLoading).length
    ).toBe(1)
  })

  it('does not render Loading when not loading', () => {
    const wrapper = shallow(<ContainerWithPhotos {...defaultProps} />)

    expect(
      wrapper
        .find(Photos)
        .dive()
        .find(ReactLoading).length
    ).toBe(0)
  })
})
