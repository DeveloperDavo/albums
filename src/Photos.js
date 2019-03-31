import React from 'react'
import PropTypes from 'prop-types'

import PhotoGridItem from './PhotoGridItem'

export default function Photos(props) {
  const { photos } = props

  const gridItems = photos.map(photo => (
    <PhotoGridItem key={photo.id} title={photo.title} userId={photo.userId} />
  ))

  return <div className="Grid">{gridItems}</div>
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}
