import React from 'react'
import { Route } from 'react-router-dom'
import { shallow } from 'enzyme'

import App from './App.js'

describe('App', () => {
  it('renders Redirect in last Route', () => {
    const wrapper = shallow(<App />)
    const component = wrapper
      .find(Route)
      .last()
      .props()
      .component()

    expect(component.props.to).toBe('/albums?start=0&limit=20')
  })
})
