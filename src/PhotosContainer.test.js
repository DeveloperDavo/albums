import React from 'react'
import { shallow } from 'enzyme'
import ReactLoading from 'react-loading'

import { PhotosContainer } from './PhotosContainer'
import Photos from './Photos'
import PhotoGridItem from './PhotoGridItem'
import Pagination from './Pagination'

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
  handlePageLimitChange: jest.fn(),
  handlePreviousClick: jest.fn(),
  handleNextClick: jest.fn(),
  items: data,
  loading: false,
  location: {
    search: '?start=0&limit=20'
  }
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

  describe('Pagination', () => {
    it('handle previous button click', () => {
      const handlePreviousClick = jest.fn()
      const props = {
        ...defaultProps,
        location: {
          search: '?start=60&limit=30'
        },
        handlePreviousClick
      }
      const wrapper = shallow(<PhotosContainer {...props} />)

      wrapper
        .find(Pagination)
        .dive()
        .find('.Pagination__btn')
        .at(0)
        .simulate('click')

      expect(handlePreviousClick).toHaveBeenCalled()
    })

    it('handles next button click', () => {
      const handleNextClick = jest.fn()
      const props = {
        ...defaultProps,
        handleNextClick
      }
      const wrapper = shallow(<PhotosContainer {...props} />)

      wrapper
        .find(Pagination)
        .dive()
        .find('.Pagination__btn')
        .at(1)
        .simulate('click')

      expect(handleNextClick).toHaveBeenCalled()
    })

    it('hides previous button if start would be below 0', () => {
      const props = {
        ...defaultProps,
        location: {
          search: '?start=0&limit=30'
        }
      }
      const wrapper = shallow(<PhotosContainer {...props} />)

      const prevBtn = wrapper
        .find(Pagination)
        .dive()
        .find('.Pagination__btn')
        .at(0)
      expect(prevBtn.props().className).toContain('hidden')
    })
  })
})
