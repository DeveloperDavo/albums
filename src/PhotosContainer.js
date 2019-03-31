import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Photos from './Photos'
import Pagination from './Pagination'
import PageLimitSelect from './PageLimitSelect'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'

import withItemFetcher from './withItemFetcher'
import withPaginationClickHandlers from './withPaginationClickHandlers'
import withPageLimitChangeHandler from './withPageLimitChangeHandler'
import { fetchPhotos } from './api/placeHolderClient'

export function PhotosContainer(props) {
  const {
    empty,
    error,
    handleNextClick,
    handlePageLimitChange,
    handlePreviousClick,
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
      <Photos photos={items} loading={loading} />
      <Pagination
        onPreviousClick={handlePreviousClick}
        previousIsHidden={start - limit < 0}
        onNextClick={handleNextClick}
      />
    </div>
  )
}

export default withItemFetcher(
  withPaginationClickHandlers(withPageLimitChangeHandler(PhotosContainer)),
  fetchPhotos
)

PhotosContainer.propTypes = {
  empty: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
