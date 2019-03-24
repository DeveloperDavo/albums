import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'

import GridItem from './GridItem'
import PageLimitSelect from './PageLimitSelect';

import './App.css'
import Pagination from './Pagination';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      pageStart: 0
    }
  }

  getAlbums = () => {
    const { pageStart } = this.state
    const limit = queryString.parse(this.props.location.search).limit
    axios
      .get(
        `https://jsonplaceholder.typicode.com/albums?_start=${pageStart}&_limit=${limit}`
      )
      .then(response => this.setState({ albums: response.data }))
  }

  handlePageLimitChange = event => {
    this.props.history.push(`${this.props.match.path}?limit=${event.target.value}`)
  }

  handleNextButtonClick = () => {
    const { pageStart } = this.state
    const limit = queryString.parse(this.props.location.search).limit
    this.setState({ pageStart: pageStart + Number(limit) })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search || this.state.pageStart !== prevState.pageStart) {
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
      <div className="App">
        <PageLimitSelect onChange={this.handlePageLimitChange} />
        <div className="Grid">{gridItems}</div>
        <div className="PaginationWrapper">
          <Pagination onClick={this.handleNextButtonClick} />
        </div>
      </div>
    )
  }
}

export default App
