import React from 'react'
import { shallow } from 'enzyme'

import { PhotosContainer } from './PhotosContainer'
import Photos from './Photos'
import PhotoGridItem from './PhotoGridItem'

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
  items: data
}

describe('PhotosContainer', () => {
  describe('Photos', () => {
    it('renders photos', () => {
      const wrapper = shallow(<PhotosContainer {...defaultProps} />)

      expect(
        wrapper
          .find(Photos)
          .dive()
          .find(PhotoGridItem).length
      ).toBe(data.length)
    })
  })
})
