import React from 'react'
import NavbarDashboard from '../components/NavbarDashboard'
import Html from '../components/Html'

export default ({ children }) => (
  <Html>
    <NavbarDashboard />
    <br /><br />
    <br /><br />
    <div className="container">
      { children }
    </div>
  </Html>
)
