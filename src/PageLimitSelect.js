import React from 'react'
import PropTypes from 'prop-types'

export default function PageLimitSelect(props) {
  const options = [20, 30, 50].map(limit => {
    return (
      <option key={limit} value={limit}>
        {limit}
      </option>
    )
  })
  return <select onChange={props.onChange}>{options}</select>
}

PageLimitSelect.propTypes = {
  onChange: PropTypes.func.isRequired
}
