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

import './AlbumsContainer.css'
import './Error.css'

export default class AlbumsContainer extends React.Component {
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

  handlePageLimitChange = event => {
    this.pushToHistory(0, event.target.value)
  }

  handleNextButtonClick = () => {
    const { start, limit } = queryString.parse(this.props.location.search)
    const nextStart = Number(start) + Number(limit)
    this.pushToHistory(nextStart, limit)
  }

  handlePreviousButtonClick = () => {
    const { start, limit } = queryString.parse(this.props.location.search)
    const previousStart = Number(start) - Number(limit)
    this.pushToHistory(previousStart, limit)
  }

  pushToHistory(start = 0, limit = 20) {
    this.props.history.push(
      `${this.props.match.path}?start=${start}&limit=${limit}`
    )
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
        onPreviousClick={this.handlePreviousButtonClick}
        previousIsHidden={start - limit < 0}
        onNextClick={this.handleNextButtonClick}
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
          <PageLimitSelect onChange={this.handlePageLimitChange} />
          <Albums loading={loading} albums={albums} />
          {this.renderPagination(start, limit)}
        </div>
      )
    }
  }
}

AlbumsContainer.propTypes = {
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
