import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Pagination from './Pagination'
import PageLimitSelect from './PageLimitSelect'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'

export default function Container(props) {
  const {
    children,
    empty,
    error,
    handleNextClick,
    handlePageLimitChange,
    handlePreviousClick,
    location
  } = props

  if (error) {
    return <Error />
  } else if (empty) {
    return <EmptyResponseMessage />
  }

  const { start, limit } = queryString.parse(location.search)
  if (isNaN(start) || isNaN(limit)) {
    return <RedirectToAlbumStart />
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
  handleNextClick: PropTypes.func.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
