import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Albums from './Albums'
import GridItem from './GridItem'
import PageLimitSelect from './PageLimitSelect'
import Pagination from './Pagination'
import Error from './Error'

jest.mock('axios')

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
  history: {
    push: jest.fn()
  },
  location: {
    search: '?start=0&limit=20'
  },
  match: {
    path: '/path'
  }
}

beforeEach(() => {
  axios.get.mockResolvedValue({ data })
})

it('fetches albums on mount', () => {
  const props = {
    ...defaultProps,
    location: {
      search: '?start=60&limit=30'
    },
    match: { path: '/albums' }
  }
  shallow(<Albums {...props} />)

  expect(axios.get).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/albums?_start=60&_limit=30'
  )
})

it('sets start and keeps limit params in url upon clicking next', () => {
  const push = jest.fn()
  const props = {
    ...defaultProps,
    location: {
      search: '?start=60&limit=30'
    },
    history: { push },
    match: { path: '/albums' }
  }
  const wrapper = shallow(<Albums {...props} />)

  wrapper
    .find(Pagination)
    .dive()
    .find('.Pagination__btn')
    .at(0)
    .simulate('click')

  expect(push).toHaveBeenCalledWith('/albums?start=30&limit=30')
})

it('sets start and keeps limit params in url upon clicking previous', () => {
  const push = jest.fn()
  const props = {
    ...defaultProps,
    history: { push },
    match: { path: '/albums' }
  }
  const wrapper = shallow(<Albums {...props} />)

  wrapper
    .find(Pagination)
    .dive()
    .find('.Pagination__btn')
    .at(1)
    .simulate('click')
  expect(push).toHaveBeenCalledWith('/albums?start=20&limit=20')
})

it('sets limit and keeps start params in url upon selecting a limit', () => {
  const push = jest.fn()
  const props = {
    ...defaultProps,
    history: { push },
    match: { path: '/albums' }
  }
  const wrapper = shallow(<Albums {...props} />)

  wrapper
    .find(PageLimitSelect)
    .dive()
    .find('select')
    .simulate('change', { target: { value: 30 } })

  expect(push).toHaveBeenCalledWith('/albums?start=0&limit=30')
})

it('fetches albums on query param change', async () => {
  const prevProps = {
    ...defaultProps,
    location: {
      search: '?start=20&limit=20'
    },
  }
  const wrapper = shallow(<Albums {...prevProps} />)

  expect(wrapper.find(Error)).toHaveLength(0)
  const props = {
    ...defaultProps,
    location: {
      search: '?start=40&limit=20'
    },
  }
  await wrapper.setProps(props)

  expect(axios.get).toHaveBeenNthCalledWith(
    1,
    'https://jsonplaceholder.typicode.com/albums?_start=20&_limit=20'
  )
  expect(axios.get).toHaveBeenNthCalledWith(
    2,
    'https://jsonplaceholder.typicode.com/albums?_start=40&_limit=20'
  )
})


it('displays grid items on mount', async () => {
  const wrapper = await shallow(<Albums {...defaultProps} />)

  expect(wrapper.find(GridItem)).toHaveLength(data.length)
})

it('renders grid item with album id as key', async () => {
  const wrapper = await shallow(<Albums {...defaultProps} />)

  expect(
    wrapper
      .find(GridItem)
      .at(0)
      .key()
  ).toBe(data[0].id.toString())
})

it('displays grid item with album title and user id', async () => {
  const wrapper = await shallow(<Albums {...defaultProps} />)

  const gridItem = wrapper.find(GridItem).at(0)
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

it('displays grid item with album cover image', async () => {
  const wrapper = await shallow(<Albums {...defaultProps} />)

  const gridItem = wrapper.find(GridItem).at(0)
  expect(
    gridItem
      .dive()
      .find('img')
      .props().src
  ).toBe('https://via.placeholder.com/150/00ff')
  expect(
    gridItem
      .dive()
      .find('img')
      .props().alt
  ).toBe(data[0].title)
})

it('does not display any errors', async () => {
  const wrapper = await shallow(<Albums {...defaultProps} />)

  expect(wrapper.find(Error)).toHaveLength(0)
})

it('displays error if fetch fails', async () => {
  axios.get.mockRejectedValue(new Error())

  const wrapper = await await shallow(<Albums {...defaultProps} />)

  expect(wrapper.find(Pagination)).toHaveLength(0)
  expect(wrapper.find(PageLimitSelect)).toHaveLength(0)
  expect(wrapper.find('.Grid')).toHaveLength(0)
  expect(wrapper.find(Error)).toHaveLength(1)
})

it('redirects if start is not a number', async () => {
  const props = {
    ...defaultProps,
    location: {
      search: '?start=NaN&limit=30'
    }
  }
  const wrapper = await shallow(<Albums {...props} />)

  expect(wrapper.find(Redirect).props().to).toBe('/albums?start=0&limit=20')
})

it('redirects if limit is not a number', async () => {
  const props = {
    ...defaultProps,
    location: {
      search: '?start=50&limit=undefined'
    }
  }
  const wrapper = await shallow(<Albums {...props} />)

  expect(wrapper.find(Redirect).props().to).toBe('/albums?start=0&limit=20')
})

it('redirects if there are no query params', async () => {
  const props = {
    ...defaultProps,
    location: {
      search: ''
    }
  }
  const wrapper = await shallow(<Albums {...props} />)

  expect(wrapper.find(Redirect).props().to).toBe('/albums?start=0&limit=20')
})

it('does not fetch if start is not a number', () => {
  const props = {
    ...defaultProps,
    location: {
      search: '?start=50&limit=undefined'
    }
  }
  shallow(<Albums {...props} />)

  expect(axios.get).not.toHaveBeenCalled()
})

it('does not fetch if limit is not a number', () => {
  const props = {
    ...defaultProps,
    location: {
      search: '?start=50&limit=undefined'
    }
  }
  const wrapper = shallow(<Albums {...props} />)

  expect(axios.get).not.toHaveBeenCalled()
})
