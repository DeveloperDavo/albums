import React from 'react'
import PropTypes from 'prop-types'
import './GridItem.css'

export default function GridItem(props) {
  const { title, userId } = props
  return (
    <div className="GridItem">
      <img src="https://via.placeholder.com/150/00ff" alt={title} />
      <p className="GridItem__title">{title}</p>
      <p className="GridItem__userId">{userId}</p>
    </div>
  )
}

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
}
