import React, {Component} from 'react';
import Link from 'next/link'

class NavbarMain extends Component {
  render() {
    return (
        <div className="navbar-fixed">
          <nav className="nav-extended">
        
            <div className="nav-wrapper light-blue darken-2">
              <div className="container">
                <a href="#" className="brand-logo">Logo</a>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link href="/"><a>Home</a></Link></li>
                  <li><Link href="/login"><a>Login</a></Link></li>
                  <li><Link href="/register"><a>Register</a></Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li><Link href="/"><a>Home</a></Link></li>
                  <li><Link href="/login"><a>Login</a></Link></li>
                  <li><Link href="/register"><a>Register</a></Link></li>
                </ul>
              </div>
            </div>
        
          </nav>
        </div>
    );
  }
}
export default NavbarMain;
