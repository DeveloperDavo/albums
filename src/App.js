import React, { Component } from 'react'
import axios from 'axios'

import GridItem from './GridItem'
import PageLimitSelect from './PageLimitSelect';

import './App.css'
import Pagination from './Pagination';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      pageStart: 0,
      pageLimit: 20,
    }
  }

  getAlbums = () => {
    const { pageStart, pageLimit } = this.state
    axios
      .get(`https://jsonplaceholder.typicode.com/albums?_start=${pageStart}&_limit=${pageLimit}`)
      .then(response => this.setState({ albums: response.data }))
  }

  handlePageLimitChange = (event) => {
    this.setState({ pageLimit: event.target.value })
  }

  handleNextButtonClick = () => {
    const { pageStart, pageLimit } = this.state
    this.setState({ pageStart: pageStart + pageLimit })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.pageLimit !== prevState.pageLimit || this.state.pageStart !== prevState.pageStart) {
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
        <div className="Grid">
          {gridItems}
        </div>
        <div className="PaginationWrapper">
          <Pagination onClick={this.handleNextButtonClick} />
        </div>
      </div>
    )
  }
}

export default App
