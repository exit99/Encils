import React, {Component} from 'react';
import Link from 'next/link'
import cookie from 'react-cookie';
import Router from 'next/router'

class NavbarMain extends Component {
  logout() {
    cookie.remove('token');
    Router.push('/');
  }

  render() {
    return (
        <div className="navbar-fixed">
          <nav className="nav-extended">
        
            <div className="nav-wrapper light-blue darken-2">
              <div className="container">
                <a href="#" className="brand-logo">Logo</a>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a onClick={ this.logout }>Logout</a></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li><a onClick={ this.logout }>Logout</a></li>
                </ul>
              </div>
            </div>

            <div className="nav-content light-blue accent-3 center">
              <div className="container">
                  <ul className="tabs tabs-transparent tabs-fixed-width">
                    <li onClick={() => Router.push("/classrooms")} className="tab"><a>Classrooms</a></li>
                    <li onClick={() => Router.push("/assignments")} className="tab"><a>Assignments</a></li>
                    <li onClick={() => Router.push("/answers")} className="tab"><a>Grade Answers</a></li>
                  </ul>
              </div>
            </div>

        
          </nav>
        </div>
    );
  }
}
export default NavbarMain;
