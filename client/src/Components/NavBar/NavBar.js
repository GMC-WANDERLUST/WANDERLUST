import React, { useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Form,
    FormControl,
    NavDropdown,
} from "react-bootstrap";
import { logout } from "../../utils";
import { useHistory } from "react-router-dom";
import {
    userId,
    getToken,
    getIsHost,
    saveIsHost,
    getIsAdmin,
} from "../../utils";
import MDropDown from "../../Components/UserProfil/MDropDown";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch } from "react-redux";
import { openHostingModal } from "../../redux/actions/hostActions";
import axios from "axios";
import Swal from "sweetalert2";
import "./NavBar.css";

function NavBar() {
    const history = useHistory();
    let isAdmin = getIsAdmin();
    let id = userId();
    let token = getToken();
    let isHost = getIsHost();
    const dispatch = useDispatch();
    const handleLogout = () => {
        logout();
        history.push("/login");
    };
    const [destinationData, setDestinationData] = useState("");
    const [hostingData, setHostingData] = useState("");
    const [travellerSelected, setTravellerSelected] = useState(false);
    const [hostSelected, setHostSelected] = useState(false);
    const [discoverSelected, setDiscoverSelected] = useState(true);
    const initialStates = () => {
        setTravellerSelected(false);
        setHostSelected(false);
        setDiscoverSelected(false);
    };
    const findTravellers = () => {
        initialStates();
        setTravellerSelected(true);
    };
    const findHosts = () => {
        initialStates();
        setHostSelected(true);
    };
    const handelDiscover = () => {
        initialStates();
        setDiscoverSelected(true);
    };
    const handelChange = (e) => {
        if (travellerSelected) {
            setDestinationData(e.target.value);
        } else if (hostSelected) {
            setHostingData(e.target.value);
        }
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
            sessionStorage.setItem("residence", hostingData);
            localStorage.setItem("residence", hostingData);
            history.push("/hostsList");
            window.location.reload();
        }
    };
    const initState = isHost === "true" ? true : false;
    const [checkedIn, setCheckedIn] = React.useState(initState);
    const toggleChecked = () => {
        setCheckedIn(!checkedIn);
        acceptGuests();
    };
    const openHosting = () => {
        dispatch(openHostingModal());
    };
    const acceptGuests = () => {
        if (isHost === "true") {
            axios
                .put(
                    `/api/user/editStatus/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                        },
                    }
                )
                .then((response) => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You want to stop accepting guests!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Continue!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            saveIsHost(false);
                            Swal.fire({
                                title: `${response.data.message}`,
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Ok`,
                                icon: "success",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    Swal.fire(error.data.data.message, "", "error");
                });
        } else {
            openHosting();
        }
    };
    return (
        <div className="wl-NavBar-container">
            <div className="navBar">
                <Navbar bg="light" variant="light" expand fixed="top">
                    <Container>
                        <Navbar.Brand href="/home">Home</Navbar.Brand>
                        <Navbar.Brand href={`/adminUi/${id}`}>
                            {isAdmin === "true" ? "Admin" : null}{" "}
                        </Navbar.Brand>
                        <Navbar.Brand href={`/profile/${id}`}>
                            Profile
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <NavDropdown
                                title={
                                    travellerSelected
                                        ? "Find Travellers"
                                        : hostSelected
                                        ? "Find Hosts"
                                        : discoverSelected
                                        ? "Discover"
                                        : null
                                }
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    href="#action/3.1"
                                    onClick={handelDiscover}
                                >
                                    Discover
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    href="#action/3.1"
                                    onClick={findTravellers}
                                >
                                    Find Travellers
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    href="#action/3.2"
                                    onClick={findHosts}
                                >
                                    Find Hosts
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder={
                                        travellerSelected
                                            ? "Enter your residence"
                                            : hostSelected
                                            ? "Enter your destination"
                                            : "Search"
                                    }
                                    className="mr-2"
                                    aria-label="Search"
                                    name="destination"
                                    onChange={handelChange}
                                />
                                <Button
                                    variant="outline-success"
                                    onClick={handleSearch}
                                    style={{ marginRight: "20px" }}
                                >
                                    Search
                                </Button>
                            </Form>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={initState}
                                            onChange={toggleChecked}
                                            // onClick={acceptGuests}
                                            // value={isHost ? "on" : "off"}
                                        />
                                    }
                                    label={
                                        initState
                                            ? "Stop Accepting Guests"
                                            : "Accept Guests"
                                    }
                                />
                            </FormGroup>
                            <MDropDown />
                            <Button
                                variant="danger"
                                type="button"
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
}

export default NavBar;
