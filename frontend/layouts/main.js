import React from 'react'
import NavbarMain from '../components/NavbarMain'
import Html from '../components/Html'

export default ({ children }) => (
  <Html>
    <NavbarMain />
    <br /><br />
    <div className="container">
      { children }
    </div>
  </Html>
)
