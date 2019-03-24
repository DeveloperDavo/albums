import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Albums from './Albums.js'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/albums" component={Albums} />
        <Route render={() => <Redirect to="/albums?start=0&limit=20" />} />
      </Switch>
    </BrowserRouter>
  )
}
