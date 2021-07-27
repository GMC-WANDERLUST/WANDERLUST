/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Footer() {
  return (
    <div>
      <footer className="main-footer">
        <strong>
          Copyright ©2021{" "}
          <span>
            <a>WanderLust</a>.
          </span>
        </strong>
        <span>  All rights reserved.</span>
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.1.0
        </div>
      </footer>
    </div>
  );
}

export default Footer;
