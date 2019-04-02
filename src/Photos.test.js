import React from 'react'
import { shallow } from 'enzyme'

import Photos from './Photos'
import PhotoGridItem from './PhotoGridItem'

const photos = [
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
  loading: false,
  photos
}

describe('Photos', () => {
  it('renders photo grid items', () => {
    const wrapper = shallow(<Photos {...defaultProps} />)

    expect(wrapper.find(PhotoGridItem).length).toBe(photos.length)
  })

  describe('PhotoGridItem', () => {
    it('renders photo grid item with photo id as key', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)

      expect(
        wrapper
          .find(PhotoGridItem)
          .at(0)
          .key()
      ).toBe(photos[0].id.toString())
    })

    it('renders photo grid item with photo title', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)

      expect(
        wrapper
          .find(PhotoGridItem)
          .at(0)
          .dive()
          .find('.GridItem__title')
          .text()
      ).toBe(photos[0].title)
    })

    it('renders photo grid item with thumbnail', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)
      const imgProps = wrapper
        .find(PhotoGridItem)
        .at(0)
        .dive()
        .find('img')
        .props()

      expect(imgProps.src).toBe('https://via.placeholder.com/150/250289')
      expect(imgProps.alt).toBe(photos[0].title)
    })
  })
})
