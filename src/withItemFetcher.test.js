import React from 'react'
import { shallow } from 'enzyme'

import withItemFetcher from './withItemFetcher'

function TestComponent() {
  return <p>Test component</p>
}
const fetchItemsMock = jest.fn()
const WrappedTestComponent = withItemFetcher(TestComponent, fetchItemsMock)

const defaultProps = {
  history: {
    push: jest.fn()
  },
  location: {
    search: '?start=0&limit=20'
  },
  match: {
    url: '/url'
  }
}

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

describe('withItemFetcher', () => {
  beforeEach(() => {
    fetchItemsMock.mockResolvedValue({ data })
  })

  it('fetches items on mount', async () => {
    const props = {
      location: {
        search: '?start=60&limit=30'
      }
    }
    const wrapper = await shallow(<WrappedTestComponent {...props} />)

    expect(fetchItemsMock).toHaveBeenCalledWith('60', '30')
    expect(wrapper.find(TestComponent).props().items).toEqual(data)
  })

  it('resets state when fetch is successful', async () => {
    const wrapper = await shallow(<WrappedTestComponent {...defaultProps} />)
    wrapper.setState({ error: true, empty: true, loading: true })

    await wrapper.instance().getItems()

    const props = wrapper.find(TestComponent).props()
    expect(props.error).toBe(false)
    expect(props.empty).toBe(false)
    expect(props.loading).toBe(false)
  })

  it('fetches items on query param change', async () => {
    const prevProps = {
      location: {
        search: '?start=20&limit=20'
      }
    }
    const wrapper = shallow(<WrappedTestComponent {...prevProps} />)

    const props = {
      location: {
        search: '?start=40&limit=20'
      }
    }
    await wrapper.setProps(props)

    expect(fetchItemsMock).toHaveBeenNthCalledWith(1, '20', '20')
    expect(fetchItemsMock).toHaveBeenNthCalledWith(2, '40', '20')
  })

  it('sets loading state to true before fetching', () => {
    const wrapper = shallow(<WrappedTestComponent {...defaultProps} />)

    const props = wrapper.find(TestComponent).props()
    expect(props.loading).toBe(true)
  })

  it('resets state while loading', async () => {
    const wrapper = shallow(<WrappedTestComponent {...defaultProps} />)
    wrapper.setState({ error: true, empty: true, items: data })

    wrapper.instance().getItems()

    const props = wrapper.find(TestComponent).props()
    expect(props.error).toBe(false)
    expect(props.empty).toBe(false)
    expect(props.items).toEqual([])
  })

  it('sets error to true when fetch fails', async () => {
    fetchItemsMock.mockRejectedValue()
    const wrapper = await await shallow(
      <WrappedTestComponent {...defaultProps} />
    )

    const props = wrapper.find(TestComponent).props()
    expect(props.error).toBe(true)
    expect(props.empty).toBe(false)
    expect(props.items).toEqual([])
    expect(props.loading).toBe(false)
  })

  it('resets state when there is an error', async () => {
    fetchItemsMock.mockRejectedValue()
    const wrapper = shallow(<WrappedTestComponent {...defaultProps} />)
    wrapper.setState({ empty: true, items: data, loading: true })

    await await wrapper.instance().getItems()

    const props = wrapper.find(TestComponent).props()
    expect(props.empty).toBe(false)
    expect(props.items).toEqual([])
    expect(props.loading).toBe(false)
  })

  it('sets empty to true when fetch is empty', async () => {
    fetchItemsMock.mockResolvedValue({ data: [] })
    const wrapper = await shallow(<WrappedTestComponent {...defaultProps} />)

    const props = wrapper.find(TestComponent).props()
    expect(props.empty).toBe(true)
  })

  it('resets state when response is empty', async () => {
    fetchItemsMock.mockResolvedValue({ data: [] })
    const wrapper = shallow(<WrappedTestComponent {...defaultProps} />)
    wrapper.setState({ error: true, items: data, loading: true })

    await wrapper.instance().getItems()

    const props = wrapper.find(TestComponent).props()
    expect(props.error).toBe(false)
    expect(props.items).toEqual([])
    expect(props.loading).toBe(false)
  })

  it('does not fetch if start is not a number', () => {
    const props = {
      ...defaultProps,
      location: {
        search: '?start=undefined&limit=30'
      }
    }
    shallow(<WrappedTestComponent {...props} />)

    expect(fetchItemsMock).not.toHaveBeenCalled()
  })

  it('does not fetch if limit is not a number', () => {
    const props = {
      ...defaultProps,
      location: {
        search: '?start=50&limit=abc'
      }
    }
    shallow(<WrappedTestComponent {...props} />)

    expect(fetchItemsMock).not.toHaveBeenCalled()
  })
})
