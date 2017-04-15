import React from 'react'

export default ({ answer, value, handleClick }) => (
  <div className={ value === 0 ? "col s1 offset-m2" : "col s1" }>
    <span 
      style={ { cursor: "pointer"} }
      onClick={ () => handleClick(answer, value) }
      className={ answer.grade == value ? "new badge orange accent-3" : "new badge grey" }
      data-badge-caption=""
    >{ value }</span>
  </div>
)
