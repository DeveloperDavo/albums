import React from 'react'
import { shallow } from 'enzyme'

import withPageLimitChangeHandler from './withPageLimitChangeHandler'

function TestComponent() {
  return <p>Test component</p>
}
const WrappedTestComponent = withPageLimitChangeHandler(TestComponent)

describe('withPageLimitChangeHandler', () => {
  it('sets limit and resets start upon selecting a limit', () => {
    const push = jest.fn()
    const props = {
      location: {
        search: '?start=20&limit=20'
      },
      history: { push },
      match: { path: '/albums' }
    }

    const wrapper = shallow(<WrappedTestComponent {...props} />)

    wrapper.props().handlePageLimitChange({ target: { value: 30 } })

    expect(push).toHaveBeenCalledWith('/albums?start=0&limit=30')
  })
})
