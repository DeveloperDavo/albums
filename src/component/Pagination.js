import React from 'react'
import PropTypes from 'prop-types'

import './Pagination.css'

export default function Pagination(props) {
  let prevClassName = 'Pagination__btn'
  if (props.previousIsHidden) prevClassName += ' hidden'
  return (
    <div className="Pagination">
      <button className={prevClassName} onClick={props.onPreviousClick}>
        <img src="/left-chevron.svg" alt="left chevron" />
      </button>
      <button className="Pagination__btn" onClick={props.onNextClick}>
        <img src="/right-chevron.svg" alt="right chevron" />
      </button>
    </div>
  )
}

Pagination.propTypes = {
  previousIsHidden: PropTypes.bool.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
}
