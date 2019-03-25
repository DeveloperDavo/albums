import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'

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
    const { start, limit } = queryString.parse(this.props.location.search)
    if (!isNaN(start) && !isNaN(limit)) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`
        )
        .then(response => this.setState({ albums: response.data }))
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
    const gridItems = this.state.albums.map(album => (
      <GridItem key={album.id} title={album.title} userId={album.userId} />
    ))

    const { start, limit } = queryString.parse(this.props.location.search)
    if (isNaN(start) || isNaN(limit)) {
      return <Redirect to="/albums?start=0&limit=20" />
    }

    return (
      <div>
        {!this.state.hasError ? (
          <>
            <PageLimitSelect onChange={this.handlePageLimitChange} />
            <div className="Grid">{gridItems}</div>
            <Pagination
              onPreviousClick={this.handlePreviousButtonClick}
              onNextClick={this.handleNextButtonClick}
            />
          </>
        ) : (
          <Error />
        )}
      </div>
    )
  }
}

export default Albums
