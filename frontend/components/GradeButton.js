import React from 'react'

const selected = {
  cursor: "pointer",
  "background-color": "#F7971E",
  background: "#F7971E"
}

const not_selected = {
  cursor: "pointer",
  "background-color": "#9e9e9e",
  background: "#9e9e9e"
}

export default ({ answer, value, handleClick }) => (
  <div className={ value === 0 ? "col s1 offset-m2" : "col s1" }>
    <span 
      style={ answer.grade == value ? selected : not_selected }
      onClick={ () => handleClick(answer, value) }
      className="new badge selected"
      data-badge-caption=""
    >{ value }</span>
  </div>
)
