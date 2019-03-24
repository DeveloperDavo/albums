import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

beforeEach(() => {
  jest.resetAllMocks()
  global.console.error = jest.fn()
})

afterEach(() => {
  expect(global.console.error).not.toBeCalled()
})
