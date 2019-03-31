import React from 'react'
import { shallow } from 'enzyme'
import ReactLoading from 'react-loading'

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
  items: data,
  loading: false
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

    describe('PhotoGridItem', () => {
      it('renders photo grid item with photo id as key', () => {
        const wrapper = shallow(<PhotosContainer {...defaultProps} />)

        expect(
          wrapper
            .find(Photos)
            .dive()
            .find(PhotoGridItem)
            .at(0)
            .key()
        ).toBe(data[0].id.toString())
      })

      it('renders photo grid item with photo title', () => {
        const wrapper = shallow(<PhotosContainer {...defaultProps} />)

        expect(
          wrapper
            .find(Photos)
            .dive()
            .find(PhotoGridItem)
            .at(0)
            .dive()
            .find('.GridItem__title')
            .text()
        ).toBe(data[0].title)
      })

      it('renders photo grid item with thumbnail', () => {
        const wrapper = shallow(<PhotosContainer {...defaultProps} />)
        const imgProps = wrapper
          .find(Photos)
          .dive()
          .find(PhotoGridItem)
          .at(0)
          .dive()
          .find('img')
          .props()

        expect(imgProps.src).toBe('https://via.placeholder.com/150/250289')
        expect(imgProps.alt).toBe(data[0].title)
      })
    })
  })

  it('renders Loading when loading', () => {
    const wrapper = shallow(<PhotosContainer {...defaultProps} loading />)

    expect(
      wrapper
        .find(Photos)
        .dive()
        .find(ReactLoading).length
    ).toBe(1)
  })

  it('does not render Loading when not loading', () => {
    const wrapper = shallow(<PhotosContainer {...defaultProps} />)

    expect(
      wrapper
        .find(Photos)
        .dive()
        .find(ReactLoading).length
    ).toBe(0)
  })
})
