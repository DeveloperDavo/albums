import React from 'react'
import { Redirect } from 'react-router-dom'

export default function() {
  return <Redirect to="/albums?start=0&limit=20" />
}
