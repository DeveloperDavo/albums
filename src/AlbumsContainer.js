import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Albums from './Albums'
import PageLimitSelect from './PageLimitSelect'
import Pagination from './Pagination'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'
import withPageLimitChangeHandler from './withPageLimitChangeHandler'
import withPaginationClickHandlers from './withPaginationClickHandlers'
import withItemFetcher from './withItemFetcher'
import { fetchAlbums } from './api/placeHolderClient'

import './Error.css'

export function AlbumsContainer(props) {
  const {
    empty,
    error,
    handlePageLimitChange,
    handlePreviousClick,
    handleNextClick,
    history,
    items,
    loading,
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
      <Albums
        albums={items}
        history={history}
        loading={loading}
        location={location}
      />
      <Pagination
        onPreviousClick={handlePreviousClick}
        previousIsHidden={start - limit < 0}
        onNextClick={handleNextClick}
      />
    </div>
  )
}

export default withItemFetcher(
  withPaginationClickHandlers(withPageLimitChangeHandler(AlbumsContainer)),
  fetchAlbums
)

AlbumsContainer.propTypes = {
  empty: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
