import React from 'react'
import PropTypes from 'prop-types'

export default function GridItem(props) {
  const { title, userId } = props
  return (
    <>
      <img src='https://via.placeholder.com/150/00ff' alt={title} />
      <p className="GridItem__title">{title}</p>
      <p className="GridItem__userId">{userId}</p>
    </>
  )
}

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
}
