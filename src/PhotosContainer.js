import React from 'react'
import PropTypes from 'prop-types'

import Photos from './Photos'
import withItemFetcher from './withItemFetcher'
import { fetchPhotos } from './api/placeHolderClient'

export function PhotosContainer(props) {
  const { items } = props
  return <Photos photos={items} />
}

export default withItemFetcher(PhotosContainer, fetchPhotos)

PhotosContainer.propTypes = {
  items: PropTypes.array.isRequired
}
