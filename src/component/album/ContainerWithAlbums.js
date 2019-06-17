import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'

import Container from '../Container'
import Albums from './Albums'
import { fetchAlbums } from '../../actions'

import '../Error.css'

class ContainerWithAlbums extends React.Component {
  getItems = () => {
    const { fetchAlbums, location } = this.props
    const { start, limit } = queryString.parse(location.search)
    if (!isNaN(start) && !isNaN(limit)) {
      fetchAlbums(start, limit)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getItems()
    }
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    const { albums, history, loading, location } = this.props

    return (
      <Container
        {...this.props}
        empty={(albums && albums.length === 0) || false}
      >
        {albums && (
          <Albums
            albums={albums}
            history={history}
            loading={loading}
            location={location}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
  error: state.error,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  fetchAlbums: (start, limit) => dispatch(fetchAlbums(start, limit))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerWithAlbums)

ContainerWithAlbums.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
