import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

export default function withPaginationClickHandlers(WrappedComponent) {
  return class extends React.Component {
    pushToHistory(start = 0, limit = 20) {
      this.props.history.push(
        `${this.props.match.path}?start=${start}&limit=${limit}`
      )
    }

    handlePreviousClick = () => {
      const { start, limit } = queryString.parse(this.props.location.search)
      const previousStart = Number(start) - Number(limit)
      this.pushToHistory(previousStart, limit)
    }

    handleNextClick = () => {
      const { start, limit } = queryString.parse(this.props.location.search)
      const nextStart = Number(start) + Number(limit)
      this.pushToHistory(nextStart, limit)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
      )
    }
  }
}

withPaginationClickHandlers.propTypes = {
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
