import React from 'react'
import "../Home.css"
function NavBar() {
    return (
      <div>
        <header
          className=" u-header u-overlap u-overlap-transparent"
          id="sec-f9a4"
        >
          <div className="u-clearfix u-sheet u-sheet-1">
            <a href=" " className="u-image u-logo u-image-1" src="true">
              <img src="true" className="u-logo-image u-logo-image-1" alt ="LandScape" />
            </a>
            <nav className="u-align-left u-menu u-menu-dropdown u-nav-spacing-25 u-offcanvas u-menu-1">
              <div
                className="menu-collapse u-custom-font u-font-montserrat"
                style={{}}
              >
                <a
                  className="u-button-style u-custom-text-active-color u-custom-text-color u-custom-text-shadow u-custom-text-shadow-blur u-custom-text-shadow-color u-custom-text-shadow-transparency u-custom-text-shadow-x u-custom-text-shadow-y u-nav-link"
                  href=" "
                  style={{ padding: "4px 0px", fontSize: "calc(1em + 8px)" }}
                >
                  <svg
                    className="u-svg-link"
                    preserveAspectRatio="xMidYMin slice"
                    viewBox="0 0 302 302"
                    style={{}}
                  >
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#svg-7b92"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="svg-7b92"
                    x="0px"
                    y="0px"
                    viewBox="0 0 302 302"
                    style={{ enableBackground: "new 0 0 302 302" }}
                    xmlSpace="preserve"
                    className="u-svg-content"
                  >
                    <g>
                      <rect y={36} width={302} height={30} />
                      <rect y={236} width={302} height={30} />
                      <rect y={136} width={302} height={30} />
                    </g>
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                  </svg>
                </a>
              </div>
              <div className="u-custom-menu u-nav-container">
                <ul className="u-custom-font u-font-montserrat u-nav u-spacing-25 u-unstyled">
                  <li className="u-nav-item">
                    <a
                      className="u-button-style u-nav-link u-text-active-custom-color-1 u-text-white"
                      href="/Home"
                      style={{
                        padding: "8px 38px",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className="u-nav-item">
                    <a
                      className="u-button-style u-nav-link u-text-active-custom-color-1 u-text-white"
                      href="/login"
                      style={{
                        padding: "8px 38px",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                      }}
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="u-nav-item">
                    <a
                      className="u-button-style u-nav-link u-text-active-custom-color-1 u-text-white"
                      href="/register"
                      style={{
                        padding: "8px 38px",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                      }}
                    >
                      Sign Up
                    </a>
                  </li>
                </ul>
              </div>
              <div className="u-custom-menu u-nav-container-collapse">
                <div className="u-align-center u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                  <div className="u-sidenav-overflow">
                    <div className="u-menu-close" />
                    <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                      <li className="u-nav-item">
                        <a
                          className="u-button-style u-nav-link"
                          href="Home.html"
                          style={{
                            padding: "8px 38px",
                            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                          }}
                        >
                          Home
                        </a>
                      </li>
                      <li className="u-nav-item">
                        <a
                          className="u-button-style u-nav-link"
                          href="Sign-In.html"
                          style={{
                            padding: "8px 38px",
                            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                          }}
                        >
                          Sign In
                        </a>
                      </li>
                      <li className="u-nav-item">
                        <a
                          className="u-button-style u-nav-link"
                          href="Sign-Up.html"
                          style={{
                            padding: "8px 38px",
                            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                          }}
                        >
                          Sign Up
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="u-black u-menu-overlay u-opacity u-opacity-70" />
              </div>
            </nav>
            <h1 className="u-custom-font u-headline u-text u-text-custom-color-3 u-text-1">
              <a href="/">WANDERLUST</a>
            </h1>
          </div>
        </header>
      </div>
    );
}

export default NavBar
