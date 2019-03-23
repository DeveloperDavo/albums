import React from 'react'
import PropTypes from 'prop-types'

export default function GridItem(props) {
  const { title, userId } = props
  return (
    <>
      <p className="GridItem__title">{title}</p>
      <p className="GridItem__userId">{userId}</p>
    </>
  )
}

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
}
