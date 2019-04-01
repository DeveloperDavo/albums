import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AlbumsContainer from './AlbumsContainer.js'
import RedirectToAlbumStart from './RedirectToAlbumStart.js'
import ContainerWithPhotos from './ContainerWithPhotos.js'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/albums" component={AlbumsContainer} />
        <Route exact path="/albums/:albumId" component={ContainerWithPhotos} />
        <Route component={RedirectToAlbumStart} />
      </Switch>
    </BrowserRouter>
  )
}
