import React from "react";
import NavBar from "./NavBar/NavBar";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import "./Home.css";


function LandingPage() {
  return (
    <div>
      <div>
        <NavBar />
        <Main/>
        <Footer />
        
      </div>
    </div>
  );
}

export default LandingPage;
