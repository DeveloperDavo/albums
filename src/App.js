import React, { Component } from 'react'
import axios from 'axios'
import GridItem from './GridItem'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/albums?_start=0&_limit=20')
      .then(response => this.setState({ albums: response.data }))
  }

  render() {
    const gridItems = this.state.albums.map(album => (
      <GridItem key={album.id} title={album.title} userId={album.userId} />
    ))
    return <div className="App">{gridItems}</div>
  }
}

export default App
