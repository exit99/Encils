import React from 'react'

export default ({ text, active }) => (
    <div className={ active ? "chip light-blue darken-2 white-text" : "chip" }>{ text }</div>
)
