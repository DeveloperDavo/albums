import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Photos from './Photos'
import Pagination from './Pagination'
import PageLimitSelect from './PageLimitSelect'

import withItemFetcher from './withItemFetcher'
import withPaginationClickHandlers from './withPaginationClickHandlers'
import withPageLimitChangeHandler from './withPageLimitChangeHandler'
import { fetchPhotos } from './api/placeHolderClient'

export function PhotosContainer(props) {
  const {
    handleNextClick,
    handlePageLimitChange,
    handlePreviousClick,
    items,
    loading,
    location
  } = props
  const { start, limit } = queryString.parse(location.search)
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
  handleNextClick: PropTypes.func.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
