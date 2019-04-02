import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import './PageLimitSelect.css'

export default function PageLimitSelect(props) {
  const options = [20, 30, 50].map(limit => {
    return (
      <option key={limit} value={limit}>
        {limit}
      </option>
    )
  })

  const { limit } = queryString.parse(props.location.search)

  return (
    <div className="PageLimitSelect">
      <label>
        Number of results per page:
        <span>&nbsp;</span>
        <select value={Number(limit)} onChange={props.onChange}>
          {options}
        </select>
      </label>
    </div>
  )
}

PageLimitSelect.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
}
