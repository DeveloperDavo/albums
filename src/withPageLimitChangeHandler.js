import React from 'react'
import PropTypes from 'prop-types'

import pushToHistory from './util/pushToHistory'

export default function withPageLimitChangeHandler(WrappedComponent) {
  return function(props) {
    function handlePageLimitChange(event) {
      const { history, match } = props
      pushToHistory(history, match, 0, event.target.value)
    }

    return (
      <WrappedComponent
        {...props}
        handlePageLimitChange={handlePageLimitChange}
      />
    )
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
    url: PropTypes.string.isRequired
  }).isRequired
}
