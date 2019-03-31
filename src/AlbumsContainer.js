import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import queryString from 'query-string'

import Albums from './Albums'
import PageLimitSelect from './PageLimitSelect'
import Pagination from './Pagination'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'
import RedirectToAlbumStart from './RedirectToAlbumStart'
import withPageLimitChangeHandler from './withPageLimitChangeHandler'
import withPaginationClickHandlers from './withPaginationClickHandlers'

import './AlbumsContainer.css'
import './Error.css'

export class AlbumsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      hasError: false,
      loading: false,
      isEmpty: false
    }
  }

  getAlbums = () => {
    const { start, limit } = queryString.parse(this.props.location.search)
    if (!isNaN(start) && !isNaN(limit)) {
      this.setState({ loading: true })
      axios
        .get(
          `https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`
        )
        .then(response => {
          if (response.data.length === 0) {
            this.setState({ isEmpty: true })
          } else {
            this.setState({ isEmpty: false })
          }
          this.setState({
            albums: response.data,
            hasError: false,
            loading: false
          })
        })
        .catch(error => this.setState({ hasError: true }))
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getAlbums()
    }
  }

  componentDidMount() {
    this.getAlbums()
  }

  renderPagination(start, limit) {
    return (
      <Pagination
        onPreviousClick={this.props.handlePreviousClick}
        previousIsHidden={start - limit < 0}
        onNextClick={this.props.handleNextClick}
      />
    )
  }

  render() {
    const { loading, albums } = this.state

    const { start, limit } = queryString.parse(this.props.location.search)
    if (isNaN(start) || isNaN(limit)) {
      return <RedirectToAlbumStart />
    }

    if (this.state.hasError) {
      return <Error />
    } else if (this.state.isEmpty) {
      return <EmptyResponseMessage />
    } else {
      return (
        <div className="AlbumsContainer">
          <PageLimitSelect
            location={this.props.location}
            onChange={this.props.handlePageLimitChange}
          />
          <Albums loading={loading} albums={albums} />
          {this.renderPagination(start, limit)}
        </div>
      )
    }
  }
}

export default withPaginationClickHandlers(
  withPageLimitChangeHandler(AlbumsContainer)
)

AlbumsContainer.propTypes = {
  handlePageLimitChange: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
}
