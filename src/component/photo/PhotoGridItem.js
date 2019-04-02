import React from 'react'
import PropTypes from 'prop-types'

import '../GridItem.css'

export default function PhotoGridItem(props) {
  const { title, thumbnailUrl, url } = props
  return (
    <div onClick={() => props.onClick(title, url)} className="GridItem">
      <img src={thumbnailUrl} alt={title} />
      <p className="GridItem__title">{title}</p>
    </div>
  )
}

PhotoGridItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
