import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'

import GridItem from './GridItem'
import PageLimitSelect from './PageLimitSelect'
import Pagination from './Pagination'
import Error from './Error'

import './Albums.css'
import './Error.css'

class Albums extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      hasError: false
    }
  }

  getAlbums = () => {
    const queryValues = queryString.parse(this.props.location.search)
    const start = queryValues.start
    const limit = queryValues.limit
    axios
      .get(
        `https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`
      )
      .then(response => this.setState({ albums: response.data }))
      .catch(error => this.setState({ hasError: true }))
  }

  handlePageLimitChange = event => {
    this.pushToHistory(
      queryString.parse(this.props.location.search).start,
      event.target.value
    )
  }

  handleNextButtonClick = () => {
    const queryValues = queryString.parse(this.props.location.search)
    const nextStart = Number(queryValues.start) + Number(queryValues.limit)
    this.pushToHistory(nextStart, queryValues.limit)
  }

  handlePreviousButtonClick = () => {
    const queryValues = queryString.parse(this.props.location.search)
    const previousStart = Number(queryValues.start) - Number(queryValues.limit)
    this.pushToHistory(previousStart, queryValues.limit)
  }

  pushToHistory(start = 0, limit = 20) {
    this.props.history.push(
      `${this.props.match.path}?start=${start}&limit=${limit}`
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.location.search !== prevProps.location.search ||
      this.state.pageStart !== prevState.pageStart
    ) {
      this.getAlbums()
    }
  }

  componentDidMount() {
    this.getAlbums()
  }

  render() {
    const gridItems = this.state.albums.map(album => (
      <GridItem key={album.id} title={album.title} userId={album.userId} />
    ))

    return (
      <div className="Albums">
        <PageLimitSelect onChange={this.handlePageLimitChange} />
        {!this.state.hasError ? (
          <div className="Grid">{gridItems}</div>
        ) : (
          <Error />
        )}
        <Pagination
          onPreviousClick={this.handlePreviousButtonClick}
          onNextClick={this.handleNextButtonClick}
        />
      </div>
    )
  }
}

export default Albums
