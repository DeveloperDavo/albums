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
  handlePreviousClick: jest.fn(),
  handleNextClick: jest.fn(),
  history: { push: jest.fn() },
  location: {
    search: '?start=0&limit=20'
  },
  match: { url: '/albums' }
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
    it('sets start and keeps limit params in url upon clicking previous', () => {
      const push = jest.fn()
      const props = {
        ...defaultProps,
        location: {
          search: '?start=60&limit=30'
        },
        history: { push },
        match: { url: '/albums' }
      }
      const wrapper = shallow(<Container {...props} />)

      wrapper
        .find(Pagination)
        .dive()
        .find('.Pagination__btn')
        .at(0)
        .simulate('click')

      expect(push).toHaveBeenCalledWith('/albums?start=30&limit=30')
    })

    it('sets start and keeps limit params in url upon clicking next', () => {
      const push = jest.fn()
      const props = {
        ...defaultProps,
        history: { push },
        location: {
          search: '?start=0&limit=20'
        },
        match: { url: '/albums' }
      }
      const wrapper = shallow(<Container {...props} />)

      wrapper
        .find(Pagination)
        .dive()
        .find('.Pagination__btn')
        .at(1)
        .simulate('click')

      expect(push).toHaveBeenCalledWith('/albums?start=20&limit=20')
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
    it('sets limit and resets start upon selecting a limit', () => {
      const push = jest.fn()
      const props = {
        ...defaultProps,
        location: {
          search: '?start=20&limit=20'
        },
        history: { push },
        match: { url: '/albums' }
      }

      const wrapper = shallow(<Container {...props} />)
      const event = { target: { value: 30 } }
      wrapper
        .find(PageLimitSelect)
        .dive()
        .find('select')
        .simulate('change', event)

      expect(push).toHaveBeenCalledWith('/albums?start=0&limit=30')
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
