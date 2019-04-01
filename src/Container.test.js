import React from 'react'
import { shallow } from 'enzyme'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

import Container from './Container'
import Pagination from './Pagination'
import PageLimitSelect from './PageLimitSelect'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'

const TestComponent = () => <p>Test component</p>

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
  handlePageLimitChange: jest.fn(),
  handlePreviousClick: jest.fn(),
  handleNextClick: jest.fn(),
  location: {
    search: '?start=0&limit=20'
  }
}

describe('Container', () => {
  it('renders children', () => {
    const wrapper = shallow(
      <Container {...defaultProps}>
        <TestComponent />
      </Container>
    )

    expect(wrapper.find(TestComponent).length).toBe(1)
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
      const wrapper = shallow(<Container {...props} />)

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
      const wrapper = shallow(<Container {...props} />)

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
      const wrapper = shallow(<Container {...props} />)

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
      const wrapper = shallow(<Container {...props} />)

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
      const wrapper = shallow(<Container {...props} />)

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
      const wrapper = shallow(<Container {...defaultProps} />)

      expect(wrapper.find(Error).length).toBe(0)
    })

    it('renders error and only error if there is one', () => {
      const wrapper = shallow(
        <Container {...defaultProps} error>
          <TestComponent />
        </Container>
      )

      expect(wrapper.find(RedirectToAlbumStart).length).toBe(0)
      expect(wrapper.find(Error).length).toBe(1)
      expect(wrapper.find(EmptyResponseMessage).length).toBe(0)
      expect(wrapper.find(ReactLoading).length).toBe(0)
      expect(wrapper.find(PageLimitSelect).length).toBe(0)
      expect(wrapper.find(TestComponent).length).toBe(0)
      expect(wrapper.find(Pagination).length).toBe(0)
    })
  })

  describe('EmptyResponseMessage', () => {
    it('does not render empty response when there is not one', () => {
      const wrapper = shallow(<Container {...defaultProps} />)

      expect(wrapper.find(EmptyResponseMessage).length).toBe(0)
    })

    it('renders link and only link back to albums when the response is empty', () => {
      const wrapper = shallow(
        <Container {...defaultProps} empty>
          <TestComponent />
        </Container>
      )

      expect(wrapper.find(RedirectToAlbumStart).length).toBe(0)
      expect(wrapper.find(Error).length).toBe(0)

      expect(
        wrapper
          .find(EmptyResponseMessage)
          .dive()
          .find(Link)
          .props().to
      ).toBe('/albums')

      expect(wrapper.find(ReactLoading).length).toBe(0)
      expect(wrapper.find(PageLimitSelect).length).toBe(0)
      expect(wrapper.find(TestComponent).length).toBe(0)
      expect(wrapper.find(Pagination).length).toBe(0)
    })
  })

  describe('RedirectToAlbumStart', () => {
    it('redirects if start is not a number', () => {
      const props = {
        ...defaultProps,
        location: {
          search: '?start=NaN&limit=30'
        }
      }
      const wrapper = shallow(<Container {...props} />)

      expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
    })

    it('redirects if limit is not a number', () => {
      const props = {
        ...defaultProps,
        location: {
          search: '?start=50&limit=undefined'
        }
      }
      const wrapper = shallow(<Container {...props} />)

      expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
    })

    it('redirects if there are no query params', () => {
      const props = {
        ...defaultProps,
        location: {
          search: ''
        }
      }
      const wrapper = shallow(<Container {...props} />)

      expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
    })

    it('renders Redirect and only Redirect if there is one', () => {
      const props = {
        ...defaultProps,
        location: {
          search: ''
        }
      }
      const wrapper = shallow(<Container {...props} empty error />)

      expect(wrapper.find(RedirectToAlbumStart).length).toBe(1)
      expect(wrapper.find(Error).length).toBe(0)
      expect(wrapper.find(EmptyResponseMessage).length).toBe(0)
      expect(wrapper.find(ReactLoading).length).toBe(0)
      expect(wrapper.find(PageLimitSelect).length).toBe(0)
      expect(wrapper.find(TestComponent).length).toBe(0)
      expect(wrapper.find(Pagination).length).toBe(0)
    })
  })
})
