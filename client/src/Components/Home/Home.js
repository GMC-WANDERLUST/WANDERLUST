import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import { FaSearch } from "react-icons/fa";

function Home() {
    const history = useHistory();
    const [travellerSelected, setTravellerSelected] = useState(false);
    const [hostSelected, setHostSelected] = useState(false);
    const [destinationData, setDestinationData] = useState("");
    console.log(destinationData);
    const handleTravellerSelected = () => {
        setTravellerSelected(true);
        setHostSelected(false);
    };
    const handleHostSelected = () => {
        setHostSelected(true);
        setTravellerSelected(false);
    };
    const handleChange = (e) => {
        setDestinationData(e.target.value);
    };
    const handleSearch = () => {
        if (travellerSelected) {
            sessionStorage.removeItem("check_in");
            sessionStorage.removeItem("city");
            sessionStorage.removeItem("residence");
            localStorage.removeItem("residence");
            sessionStorage.setItem("destination", destinationData);
            localStorage.setItem("destination", destinationData);
            history.push("/postsList");
            window.location.reload();
        } else if (hostSelected) {
            sessionStorage.removeItem("check_in");
            sessionStorage.removeItem("city");
            sessionStorage.removeItem("destination");
            localStorage.removeItem("destination");
            sessionStorage.setItem("residence", destinationData);
            localStorage.setItem("residence", destinationData);
            history.push("/hostsList");
            window.location.reload();
        }
    };
    return (
        <div className="wl-container">
            <NavBar />
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
                                            className="u-border-none u-btn u-btn-round u-button-style u-custom-color-4 u-hover-custom-color-6 u-radius-50 u-btn-1"
                                            data-animation-name="fadeIn"
                                            data-animation-duration={1000}
                                            data-animation-delay={0}
                                            data-animation-direction="Down"
                                            onClick={handleSearch}
                                        >
                                            <span className="search-button-wl">
                                                <FaSearch size="20px" />
                                                <span className="search-item">
                                                    Search
                                                </span>
                                            </span>
                                        </button>

                                        <form className="u-align-center u-border-4 u-border-custom-color-4 u-radius-18 u-search u-search-right u-white u-search-1">
                                            <input
                                                className="u-custom-font u-search-input u-text-font u-search-input-1"
                                                type="search"
                                                name="search"
                                                onChange={handleChange}
                                                placeholder="Ex : Istanbul.."
                                            />
                                        </form>
                                        <div className="wl-search-input-box">
                                            <form>
                                                <label className="wl-radio-choose">
                                                    <input
                                                        type="radio"
                                                        name="search"
                                                        value="destination"
                                                        onClick={
                                                            handleTravellerSelected
                                                        }
                                                    />
                                                    &nbsp; Find traveller
                                                </label>

                                                <label className="wl-radio-choose">
                                                    <input
                                                        type="radio"
                                                        name="search"
                                                        value="residence"
                                                        onClick={
                                                            handleHostSelected
                                                        }
                                                    />
                                                    &nbsp; Find host
                                                </label>
                                            </form>
                                        </div>
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
    );
}

export default Home;
