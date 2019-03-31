import React from 'react'
import PropTypes from 'prop-types'

import './GridItem.css'

export default function PhotoGridItem(props) {
  const { title } = props
  return (
    <div className="GridItem">
      <p className="GridItem__title">{title}</p>
    </div>
  )
}

PhotoGridItem.propTypes = {
  title: PropTypes.string.isRequired
}
