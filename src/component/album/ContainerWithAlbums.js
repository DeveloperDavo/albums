import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Container from '../Container'
import Albums from './Albums'
import { fetchAlbums } from '../../api/placeHolderClient'

import '../Error.css'

export default class ContainerWithAlbums extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      empty: false,
      error: false,
      items: [],
      loading: false
    }
  }

  getItems = () => {
    const { location } = this.props
    const { start, limit } = queryString.parse(location.search)
    if (!isNaN(start) && !isNaN(limit)) {
      this.setState({ loading: true, empty: false, error: false, items: [] })
      fetchAlbums(this.props)
        .then(response => {
          if (response.data.length === 0) this.setState({ empty: true })
          this.setState({
            items: response.data,
            loading: false
          })
        })
        .catch(error => this.setState({ error: true, loading: false }))
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
    const { items, loading } = this.state
    const { history, location } = this.props

    return (
      <Container {...this.props}>
        <Albums
          albums={items}
          history={history}
          loading={loading}
          location={location}
        />
      </Container>
    )
  }
}

ContainerWithAlbums.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}
