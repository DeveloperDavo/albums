import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Photos from './Photos'
import Pagination from './Pagination'
import withItemFetcher from './withItemFetcher'
import withPaginationClickHandlers from './withPaginationClickHandlers'
import { fetchPhotos } from './api/placeHolderClient'

export function PhotosContainer(props) {
  const {
    handleNextClick,
    handlePreviousClick,
    items,
    loading,
    location
  } = props
  const { start, limit } = queryString.parse(location.search)
  return (
    <div className="Container">
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
  withPaginationClickHandlers(PhotosContainer),
  fetchPhotos
)

PhotosContainer.propTypes = {
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
