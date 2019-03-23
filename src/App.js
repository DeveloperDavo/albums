import React, { Component } from 'react'
import axios from 'axios'
import GridItem from './GridItem'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/albums')
      .then(response => this.setState({ albums: response.data }))
  }

  render() {
    const gridItems = this.state.albums.map(album => (
      <GridItem key={album.id} title={album.title} userId={album.userId} />
    ))
    return <div>{gridItems}</div>
  }
}

export default App
