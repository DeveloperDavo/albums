import React from 'react'
import { shallow } from 'enzyme'
import axios from 'axios'

import App from './App'
import GridItem from './GridItem'
import PageLimitSelect from './PageLimitSelect';
import Pagination from './Pagination'

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

beforeEach(() => {
  axios.get.mockResolvedValue({ data })
})

it('fetches albums on mount with a start of 0 and a limit of 20', () => {
  shallow(<App />)

  expect(axios.get).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/albums?_start=0&_limit=20'
  )
})

it('displays grid items on mount', async () => {
  const wrapper = await shallow(<App />)

  expect(wrapper.find(GridItem)).toHaveLength(data.length)
})

it('renders grid item with album id as key', async () => {
  const wrapper = await shallow(<App />)

  expect(wrapper.find(GridItem).at(0).key()).toBe(data[0].id.toString())
})

it('displays grid item with album title and user id', async () => {
  const wrapper = await shallow(<App />)

  const gridItem = wrapper.find(GridItem).at(0)
  expect(gridItem.dive().find('.GridItem__title').text()).toBe(data[0].title)
  expect(gridItem.dive().find('.GridItem__userId').text()).toBe(data[0].userId.toString())
})

it('displays grid item with album cover image', async () => {
  const wrapper = await shallow(<App />)

  const gridItem = wrapper.find(GridItem).at(0)
  expect(gridItem.dive().find('img').props().src).toBe('https://via.placeholder.com/150/00ff')
  expect(gridItem.dive().find('img').props().alt).toBe(data[0].title)
})

it('fetches albums with selected limit', () => {
  const wrapper = shallow(<App />)

  wrapper.find(PageLimitSelect).dive().find('select').simulate('change', { target: { value: 30 } } );

  expect(axios.get).toHaveBeenLastCalledWith(
    'https://jsonplaceholder.typicode.com/albums?_start=0&_limit=30'
  )
})

it('fetches next page of albums on next button click', () => {
  const wrapper = shallow(<App />)

  wrapper.find(Pagination).dive().find('.Pagination__next').simulate('click');

  expect(axios.get).toHaveBeenLastCalledWith(
    'https://jsonplaceholder.typicode.com/albums?_start=20&_limit=20'
  )
})
