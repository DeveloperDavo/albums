import React from 'react'
import { Route } from 'react-router-dom'
import { shallow } from 'enzyme'

import App from './App.js'

describe('App', () => {
  it('renders Redirect in last Route', () => {
    const wrapper = shallow(<App />)
    const Redirect = wrapper
      .find(Route)
      .last()
      .props()
      .render()

    expect(Redirect.props.to).toBe('/albums?start=0&limit=20')
  })
})
