import React from 'react'

export default ({ text, active, handleClick }) => (
    <div className={ active ? "chip selected-item white-text" : "chip" } style={ {cursor: 'pointer'} } onClick={ handleClick } >{ text }</div>
)
