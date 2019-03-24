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
      albums: []
    }
  }

  getAlbums = (start = 0, limit = 20) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`)
      .then(response => this.setState({ albums: response.data }))
  }

  handlePageLimitChange = (event) => {
    this.getAlbums(0, event.target.value)
  }

  handleNextButtonClick = () => {
    this.getAlbums(20)
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
