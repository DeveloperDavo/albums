import React from 'react'
import PropTypes from 'prop-types'

import GridItem from './GridItem'
import ReactLoading from 'react-loading'

export default function Albums(props) {
  const { albums, loading } = props

  const gridItems = albums.map(album => (
    <GridItem key={album.id} title={album.title} userId={album.userId} />
  ))

  return loading ? (
    <ReactLoading className="Albums__loading" type={'spokes'} color={'black'} />
  ) : (
    <div className="Grid">{gridItems}</div>
  )
}

Albums.propTypes = {
  albums: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}
