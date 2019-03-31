import React from 'react'
import PropTypes from 'prop-types'

export default function withPageLimitChangeHandler(WrappedComponent) {
  return class extends React.Component {
    pushToHistory(start = 0, limit = 20) {
      this.props.history.push(
        `${this.props.match.path}?start=${start}&limit=${limit}`
      )
    }

    handlePageLimitChange = event => {
      this.pushToHistory(0, event.target.value)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handlePageLimitChange={this.handlePageLimitChange}
        />
      )
    }
  }
}

withPageLimitChangeHandler.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
}
