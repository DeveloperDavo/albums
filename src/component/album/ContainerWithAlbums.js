import React from 'react'
import PropTypes from 'prop-types'

import Container from '../Container'
import Albums from './Albums'
import withItemFetcher from '../withItemFetcher'
import { fetchAlbums } from '../../api/placeHolderClient'

import '../Error.css'

export function ContainerWithAlbums(props) {
  const { history, items, loading, location } = props

  return (
    <Container {...props}>
      <Albums
        albums={items}
        history={history}
        loading={loading}
        location={location}
      />
    </Container>
  )
}

export default withItemFetcher(ContainerWithAlbums, fetchAlbums)

ContainerWithAlbums.propTypes = {
  empty: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
