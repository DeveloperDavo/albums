import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'

import Albums from './Albums'
import PageLimitSelect from './PageLimitSelect'
import Pagination from './Pagination'
import Error from './Error'
import EmptyResponseMessage from './EmptyResponseMessage'

import './AlbumsContainer.css'
import './Error.css'

class AlbumsContainer extends Component {
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
    this.pushToHistory(
      queryString.parse(this.props.location.search).start,
      event.target.value
    )
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

  render() {
    const { loading, albums } = this.state
    const { start, limit } = queryString.parse(this.props.location.search)
    if (isNaN(start) || isNaN(limit)) {
      return <Redirect to="/albums?start=0&limit=20" />
    }

    if (this.state.hasError) {
      return <Error />
    } else if (this.state.isEmpty) {
      return <EmptyResponseMessage />
    } else {
      return (
        <>
          <PageLimitSelect onChange={this.handlePageLimitChange} />
          <Albums loading={loading} albums={albums} />
          <Pagination
            onPreviousClick={this.handlePreviousButtonClick}
            previousIsHidden={start - limit < 0}
            onNextClick={this.handleNextButtonClick}
          />
        </>
      )
    }
  }
}

export default AlbumsContainer
