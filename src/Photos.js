import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'

import PhotoGridItem from './PhotoGridItem'

export default function Photos(props) {
  const { loading, photos } = props

  const gridItems = photos.map(photo => (
    <PhotoGridItem
      key={photo.id}
      title={photo.title}
      thumbnailUrl={photo.thumbnailUrl}
    />
  ))

  return loading ? (
    <ReactLoading className="loading" type={'spokes'} color={'black'} />
  ) : (
    <div className="Grid">{gridItems}</div>
  )
}

Photos.propTypes = {
  loading: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired
}
