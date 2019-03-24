import React from 'react'
import PropTypes from 'prop-types'

import './Pagination.css'

export default function Pagination (props) {
  return (
    <button className="Pagination__next" onClick={props.onClick}>
      <img src="right-chevron.svg" alt="right chevron" />
    </button>
  )
}

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired
}