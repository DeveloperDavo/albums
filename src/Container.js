import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Pagination from './Pagination'
import PageLimitSelect from './PageLimitSelect'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'

import pushToHistory from './util/pushToHistory'

export default function Container(props) {
  const { children, empty, error, history, location, match } = props

  function handlePageLimitChange(event) {
    pushToHistory(history, match.url, 0, event.target.value)
  }

  function handlePreviousClick() {
    const { start, limit } = queryString.parse(props.location.search)
    const previousStart = Number(start) - Number(limit)
    pushToHistory(history, match.url, previousStart, limit)
  }

  function handleNextClick() {
    const { start, limit } = queryString.parse(props.location.search)
    const nextStart = Number(start) + Number(limit)
    pushToHistory(history, match.url, nextStart, limit)
  }

  const { start, limit } = queryString.parse(location.search)
  if (isNaN(start) || isNaN(limit)) {
    return <RedirectToAlbumStart />
  }

  if (error) {
    return <Error />
  } else if (empty) {
    return <EmptyResponseMessage />
  }

  return (
    <div className="Container">
      <PageLimitSelect location={location} onChange={handlePageLimitChange} />
      {children}
      <Pagination
        onPreviousClick={handlePreviousClick}
        previousIsHidden={start - limit < 0}
        onNextClick={handleNextClick}
      />
    </div>
  )
}

Container.propTypes = {
  empty: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
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
