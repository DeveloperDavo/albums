import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'

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
      expect(imgProps.alt).toBe('thumbnail')
    })

    it('renders closed modal', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)

      expect(wrapper.find(ReactModal).props().isOpen).toBe(false)
    })

    it('renders modal with photo details', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)

      wrapper
        .find(PhotoGridItem)
        .at(1)
        .dive()
        .find('div')
        .simulate('click')

      expect(wrapper.find('h3').text()).toBe(photos[1].title)
      expect(wrapper.find('.Modal__photo').props().src).toBe(photos[1].url)
      expect(wrapper.find('.Modal__photo').props().alt).toBe('full size')
    })

    it('opens modal on photo grid item click', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)

      wrapper
        .find(PhotoGridItem)
        .at(1)
        .simulate('click')

      expect(wrapper.find(ReactModal).props().isOpen).toBe(true)
    })

    it('closes modal on close click', () => {
      const wrapper = shallow(<Photos {...defaultProps} />)

      wrapper
        .find(PhotoGridItem)
        .at(1)
        .simulate('click')

      wrapper
        .find(ReactModal)
        .find('.Modal__close__img')
        .simulate('click')

      expect(wrapper.find(ReactModal).props().isOpen).toBe(false)
    })
  })
})
