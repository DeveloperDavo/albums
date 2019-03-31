import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'

import { AlbumsContainer } from './AlbumsContainer'
import Albums from './Albums'
import AlbumGridItem from './AlbumGridItem'
import PageLimitSelect from './PageLimitSelect'
import Pagination from './Pagination'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'

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
  empty: false,
  error: false,
  handlePageLimitChange: jest.fn(),
  handlePreviousClick: jest.fn(),
  handleNextClick: jest.fn(),
  items: data,
  loading: false,
  location: {
    search: '?start=0&limit=20'
  }
}

describe('AlbumsContainer', () => {
  describe('Albums', () => {
    it('renders albums', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} />)

      expect(
        wrapper
          .find(Albums)
          .dive()
          .find(AlbumGridItem).length
      ).toBe(data.length)
    })

    it('renders album with album id as key', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} />)

      expect(
        wrapper
          .find(Albums)
          .dive()
          .find(AlbumGridItem)
          .at(0)
          .key()
      ).toBe(data[0].id.toString())
    })

    it('renders album with album title and user id', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} />)

      const gridItem = wrapper
        .find(Albums)
        .dive()
        .find(AlbumGridItem)
        .at(0)
      expect(
        gridItem
          .dive()
          .find('.GridItem__title')
          .text()
      ).toBe(data[0].title)
      expect(
        gridItem
          .dive()
          .find('.GridItem__userId')
          .text()
      ).toBe(data[0].userId.toString())
    })

    it('renders album with album cover image', () => {
      const data = [
        {
          userId: 23,
          id: 1,
          title: 'quidem molestiae enim'
        }
      ]

      const wrapper = shallow(
        <AlbumsContainer {...defaultProps} items={data} />
      )

      const imgProps = wrapper
        .find(Albums)
        .dive()
        .find(AlbumGridItem)
        .at(0)
        .dive()
        .find('img')
        .props()

      expect(imgProps.src).toBe('https://via.placeholder.com/150/004ba0')
      expect(imgProps.alt).toBe(data[0].title)
    })

    it('renders Loading when loading', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} loading />)

      expect(
        wrapper
          .find(Albums)
          .dive()
          .find(ReactLoading).length
      ).toBe(1)
    })

    it('does not render Loading when not loading', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} />)

      expect(
        wrapper
          .find(Albums)
          .dive()
          .find(ReactLoading).length
      ).toBe(0)
    })
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
      const wrapper = shallow(<AlbumsContainer {...props} />)

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
      const wrapper = shallow(<AlbumsContainer {...props} />)

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
      const wrapper = shallow(<AlbumsContainer {...props} />)

      const prevBtn = wrapper
        .find(Pagination)
        .dive()
        .find('.Pagination__btn')
        .at(0)
      expect(prevBtn.props().className).toContain('hidden')
    })
  })

  describe('PageLimitSelect', () => {
    it('handles page limit change', () => {
      const handlePageLimitChange = jest.fn()
      const props = {
        ...defaultProps,
        handlePageLimitChange
      }
      const wrapper = shallow(<AlbumsContainer {...props} />)

      const event = { target: { value: 30 } }
      wrapper
        .find(PageLimitSelect)
        .dive()
        .find('select')
        .simulate('change', event)

      expect(handlePageLimitChange).toHaveBeenCalledWith(event)
    })

    it('renders current limit from url', () => {
      const props = {
        ...defaultProps,
        location: {
          search: '?start=20&limit=30'
        }
      }
      const wrapper = shallow(<AlbumsContainer {...props} />)

      expect(
        wrapper
          .find(PageLimitSelect)
          .dive()
          .find('select')
          .props().value
      ).toBe(30)
    })
  })

  describe('Error', () => {
    it('does not render error if there is not one', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} />)

      expect(wrapper.find(Error).length).toBe(0)
    })

    it('renders error and only error if there is one', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} error />)

      expect(wrapper.find(EmptyResponseMessage).length).toBe(0)
      expect(wrapper.find(ReactLoading).length).toBe(0)
      expect(wrapper.find(Pagination).length).toBe(0)
      expect(wrapper.find(PageLimitSelect).length).toBe(0)
      expect(wrapper.find(Albums).length).toBe(0)
      expect(wrapper.find(Error).length).toBe(1)
    })
  })

  describe('EmptyResponseMessage', () => {
    it('does not render empty response when there is not one', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} />)

      expect(wrapper.find(EmptyResponseMessage).length).toBe(0)
    })

    it('renders link and only link back to albums when the response is empty', () => {
      const wrapper = shallow(<AlbumsContainer {...defaultProps} empty />)

      expect(wrapper.find(Error).length).toBe(0)
      expect(wrapper.find(ReactLoading).length).toBe(0)
      expect(wrapper.find(Pagination).length).toBe(0)
      expect(wrapper.find(PageLimitSelect).length).toBe(0)
      expect(wrapper.find('.Grid').length).toBe(0)
      expect(
        wrapper
          .find(EmptyResponseMessage)
          .dive()
          .find(Link)
          .props().to
      ).toBe('/albums')
    })

    describe('RedirectToAlbumStart', () => {
      it('redirects if start is not a number', () => {
        const props = {
          ...defaultProps,
          location: {
            search: '?start=NaN&limit=30'
          }
        }
        const wrapper = shallow(<AlbumsContainer {...props} />)

        expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
      })

      it('redirects if limit is not a number', () => {
        const props = {
          ...defaultProps,
          location: {
            search: '?start=50&limit=undefined'
          }
        }
        const wrapper = shallow(<AlbumsContainer {...props} />)

        expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
      })

      it('redirects if there are no query params', () => {
        const props = {
          ...defaultProps,
          location: {
            search: ''
          }
        }
        const wrapper = shallow(<AlbumsContainer {...props} />)

        expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
      })
    })
  })
})
