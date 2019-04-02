import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <p className="Error">
      Oops! Something went wrong. Return to
      <span>&nbsp;</span>
      <Link to="albums">albums</Link>
    </p>
  )
}
