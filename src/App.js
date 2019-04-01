import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ContainerWithAlbums from './ContainerWithAlbums'
import RedirectToAlbumStart from './RedirectToAlbumStart'
import ContainerWithPhotos from './ContainerWithPhotos'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/albums" component={ContainerWithAlbums} />
        <Route exact path="/albums/:albumId" component={ContainerWithPhotos} />
        <Route component={RedirectToAlbumStart} />
      </Switch>
    </BrowserRouter>
  )
}
