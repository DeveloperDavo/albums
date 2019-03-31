import React from 'react'
import PropTypes from 'prop-types'

import PhotoGridItem from './PhotoGridItem'

export default function Photos(props) {
  const { photos } = props

  return photos.map(photo => (
    <PhotoGridItem key={photo.id} title={photo.title} userId={photo.userId} />
  ))
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}
