/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { userId } from "../../utils";

function Header() {
  const id = userId();

    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-dark">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href=""
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="/home" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href={`/profile/${id}`} className="nav-link">
                Profile
              </a>
            </li>
          </ul>
          
            
        
        </nav>
      </div>
    );
}

export default Header
