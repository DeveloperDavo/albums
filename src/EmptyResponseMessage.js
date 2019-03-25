import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyResponseMessage() {
  return (
    <p className="EmptyResponseMessage">
      Nothing to see here. Return to
      <span>&nbsp;</span>
      <Link to="/albums">first page</Link>
    </p>
  )
}
