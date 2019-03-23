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
