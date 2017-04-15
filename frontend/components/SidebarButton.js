import React from 'react'

export default ({ text, active, handleClick }) => (
    <div className={ active ? "chip light-blue darken-2 white-text" : "chip" } style={ {cursor: 'pointer'} } onClick={ handleClick } >{ text }</div>
)
