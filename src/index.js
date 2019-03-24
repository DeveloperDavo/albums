import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Albums from './Albums'

import * as serviceWorker from './serviceWorker'

import 'normalize.css'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Route path='/albums' component={Albums}/>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
