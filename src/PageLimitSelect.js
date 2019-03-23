import React from 'react'
import PropTypes from 'prop-types'

import './PageLimitSelect.css'

export default function PageLimitSelect(props) {
  const options = [20, 30, 50].map(limit => {
    return (
      <option key={limit} value={limit}>
        {limit}
      </option>
    )
  })
  return (
    <div className="PageLimitSelect">
      <label>Number of albums per page: </label>
      <select onChange={props.onChange}>{options}</select>
    </div>
  )
}

PageLimitSelect.propTypes = {
  onChange: PropTypes.func.isRequired
}
