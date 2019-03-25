import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import AlbumsContainer from './AlbumsContainer.js'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/albums" component={AlbumsContainer} />
        <Route render={() => <Redirect to="/albums?start=0&limit=20" />} />
      </Switch>
    </BrowserRouter>
  )
}
