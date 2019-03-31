import React from 'react'
import { shallow } from 'enzyme'
import withPaginationClickHandlers from './withPaginationClickHandlers'

function TestComponent() {
  return <p>Test component</p>
}
const WrappedTestComponent = withPaginationClickHandlers(TestComponent)

describe('withPaginationClickHandlers', () => {
  it('sets start and keeps limit params in url upon clicking previous', () => {
    const push = jest.fn()
    const props = {
      location: {
        search: '?start=60&limit=30'
      },
      history: { push },
      match: { url: '/albums' }
    }
    const wrapper = shallow(<WrappedTestComponent {...props} />)

    wrapper.props().handlePreviousClick()

    expect(push).toHaveBeenCalledWith('/albums?start=30&limit=30')
  })

  it('sets start and keeps limit params in url upon clicking next', () => {
    const push = jest.fn()
    const props = {
      history: { push },
      location: {
        search: '?start=0&limit=20'
      },
      match: { url: '/albums' }
    }
    const wrapper = shallow(<WrappedTestComponent {...props} />)

    wrapper.props().handleNextClick()

    expect(push).toHaveBeenCalledWith('/albums?start=20&limit=20')
  })
})
