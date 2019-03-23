import React from 'react'
import { shallow } from 'enzyme'
import axios from 'axios'

import App from './App'
import GridItem from './GridItem'

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

it('fetches albums on mount', () => {
  shallow(<App />)

  expect(axios.get).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/albums'
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
