import React from "react";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
import { FaSearch } from "react-icons/fa";

function Home() {
    return (
        <div>
            <NavBar />
            <div className="wl-container">
                <section className="u-clearfix u-section-1" id="sec-e381">
                    <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                        <div className="u-layout" style={{}}>
                            <div className="u-layout-row" style={{}}>
                                <div
                                    className="u-container-style u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-white u-layout-cell-1"
                                    src
                                >
                                    <div className="u-container-layout u-container-layout-1">
                                        <div className="wl-paper-container">
                                            <h2 className="u-align-center u-text u-text-custom-color-5 u-text-1">
                                                WANDERLUST
                                            </h2>
                                            <h1
                                                className="u-align-center u-text u-text-2"
                                                data-animation-name="fadeIn"
                                                data-animation-duration={1000}
                                                data-animation-delay={0}
                                                data-animation-direction
                                            >
                                                {" "}
                                                A HOME FOR YOU&nbsp;
                                                <br />
                                                WHEREVER YOU GO
                                            </h1>
                                            <button
                                                href="https://nicepbuttonge.com/c/education-website-templates"
                                                className="u-border-none u-btn u-btn-round u-button-style u-custom-color-4 u-hover-custom-color-6 u-radius-50 u-btn-1"
                                                data-animation-name="fadeIn"
                                                data-animation-duration={1000}
                                                data-animation-delay={0}
                                                data-animation-direction="Down"
                                            >
                                                <span className="search-button-wl">
                                                    <FaSearch size="20px" />
                                                    <span className="search-item">Search</span> 
                                                </span>
                                            </button>
                                            <form
                                                action="#"
                                                method="get"
                                                className="u-align-center u-border-4 u-border-custom-color-4 u-radius-18 u-search u-search-right u-white u-search-1"
                                            >
                                                {/* <button
                                                    className="u-search-button"
                                                    type="submit"
                                                > */}
                                                {/* <span className="u-icon-circle u-search-icon u-text-custom-color-5 u-search-icon-1">
                                                    <svg
                                                        className="u-svg-link"
                                                        preserveAspectRatio="xMidYMin slice"
                                                        viewBox="0 0 56.966 56.966"
                                                        style={{}}
                                                    >
                                                        <use
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            xlinkHref="#svg-3152"
                                                        />
                                                    </svg>
                                                    <svg
                                                        className="u-svg-content"
                                                        viewBox="0 0 56.966 56.966"
                                                        x="0px"
                                                        y="0px"
                                                        id="svg-3152"
                                                        style={{
                                                            enableBackground:
                                                                "new 0 0 56.966 56.966",
                                                        }}
                                                    >
                                                        <path
                                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
	s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
	c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
	s-17-7.626-17-17S14.61,6,23.984,6z"
                                                        />
                                                    </svg>
                                                </span> */}
                                                {/* </button> */}
                                                <input
                                                    className="u-custom-font u-search-input u-text-font u-search-input-1"
                                                    type="search"
                                                    name="search"
                                                    placeholder="Ex : Istanbul.."
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-1"
                                    src
                                    data-image-width={1200}
                                    data-image-height={900}
                                >
                                    <div
                                        className="u-container-layout u-valign-middle u-container-layout-2"
                                        src
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="u-align-center u-small-text u-text u-text-variant u-text-3">
                        Who said Travelling should be expensive ?
                    </p>
                    <h5 className="u-align-center u-text u-text-4">
                        {" "}
                        Made&nbsp;with&nbsp;❤️&nbsp;in Tunisia
                        <span style={{ fontWeight: 700 }} />
                    </h5>
                </section>
            </div>
        </div>
    );
}

export default Home;
