import React from 'react'
import PropTypes from 'prop-types'

import pushToHistory from './util/pushToHistory'

import './GridItem.css'
import './AlbumGridItem.css'

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

export default function AlbumGridItem(props) {
  function handleClick() {
    const { history, id } = props
    const url = '/albums/' + id
    pushToHistory(history, url)
  }
  const { title, userId } = props
  const color = colors[userId % 10]
  return (
    <div className="GridItem">
      <img
        className="AlbumGridItem__img"
        src={`https://via.placeholder.com/150/${color}`}
        alt={title}
        onClick={handleClick}
      />
      <p className="GridItem__userId">{userId}</p>
      <p className="GridItem__title">{title}</p>
    </div>
  )
}

AlbumGridItem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
}
