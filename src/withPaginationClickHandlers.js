import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import pushToHistory from './util/pushToHistory'

export default function withPaginationClickHandlers(WrappedComponent) {
  return function(props) {
    const { history, match } = props
    function handlePreviousClick() {
      const { start, limit } = queryString.parse(props.location.search)
      const previousStart = Number(start) - Number(limit)
      pushToHistory(history, match, previousStart, limit)
    }

    function handleNextClick() {
      const { start, limit } = queryString.parse(props.location.search)
      const nextStart = Number(start) + Number(limit)
      pushToHistory(history, match, nextStart, limit)
    }

    return (
      <WrappedComponent
        {...props}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
      />
    )
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
    url: PropTypes.string.isRequired
  }).isRequired
}
