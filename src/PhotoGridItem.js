import React from 'react'
import PropTypes from 'prop-types'

import './GridItem.css'

export default function PhotoGridItem(props) {
  const { title, thumbnailUrl } = props
  return (
    <div onClick={props.onClick} className="GridItem">
      <img src={thumbnailUrl} alt={title} />
      <p className="GridItem__title">{title}</p>
    </div>
  )
}

// TODO
PhotoGridItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired
}
