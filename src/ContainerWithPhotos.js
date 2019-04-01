import React from 'react'
import PropTypes from 'prop-types'

import Container from './Container'
import Photos from './Photos'

import withItemFetcher from './withItemFetcher'
import withPaginationClickHandlers from './withPaginationClickHandlers'
import withPageLimitChangeHandler from './withPageLimitChangeHandler'
import { fetchPhotos } from './api/placeHolderClient'

export function ContainerWithPhotos(props) {
  const { items, loading } = props

  return (
    <Container {...props}>
      <Photos photos={items} loading={loading} />
    </Container>
  )
}

export default withItemFetcher(
  withPaginationClickHandlers(withPageLimitChangeHandler(ContainerWithPhotos)),
  fetchPhotos
)

ContainerWithPhotos.propTypes = {
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
