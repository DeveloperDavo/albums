import 'react-app-polyfill/ie11'
import 'core-js/fn/symbol/iterator.js'
import 'core-js/es6/symbol.js'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'

import App from './component/App'

import * as serviceWorker from './serviceWorker'

import '../node_modules/normalize.css/normalize.css'
import './index.css'

ReactModal.setAppElement('#root')

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
