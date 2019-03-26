import React from 'react'
import PropTypes from 'prop-types'
import './GridItem.css'

const colors = [
  '000000',
  'eba466',
  'f55500',
  '004ba0',
  '63a4ff',
  '5cb85c',
  '449d44',
  'ff9999',
  '990000',
  'ffff66'
]

export default function GridItem(props) {
  const { title, userId } = props
  const color = colors[userId % 10]
  return (
    <div className="GridItem">
      <img src={`https://via.placeholder.com/150/${color}`} alt={title} />
      <p className="GridItem__title">{title}</p>
      <p className="GridItem__userId">{userId}</p>
    </div>
  )
}

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
}
