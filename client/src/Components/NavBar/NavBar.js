import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    NavDropdown,
} from "react-bootstrap";
import Button from "@material-ui/core/Button";
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
import { useDispatch, useSelector } from "react-redux";
import { openHostingModal } from "../../redux/actions/hostActions";
import axios from "axios";
import Swal from "sweetalert2";
import "./NavBar.css";
import { FaHome } from "react-icons/fa";
import {
    getUserProfile,
    getRandomUserProfile,
} from "../../redux/actions/userActions";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { purple, red } from "@material-ui/core/colors";
import logo from "../NavBar/logo.png";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
        fontSize: "0.7em",
        width: "100px",
    },
    rspButton: {
        margin: theme.spacing(0),
        fontSize: "0.5em",
        width: "10px",
    },
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(0),
        },
    },
}));
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        "&:hover": {
            backgroundColor: purple[700],
        },
    },
}))(Button);
const SearchButtonResponsive = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        "&:hover": {
            backgroundColor: purple[700],
        },
    },
}))(Button);

function NavBar({ rId }) {
    const classes = useStyles();
    const history = useHistory();
    let isAdmin = getIsAdmin();
    let id = userId();
    let token = getToken();
    let isHost = getIsHost();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
    }, [id, token, dispatch]);
    const user = useSelector((state) => state.userReducer.user);
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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        console.log("click", event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="wl-NavBar-container">
            <Navbar
                bg="light"
                variant="light"
                expand
                fixed="top"
                className="navbar-box"
            >
                <a className={classes.root} href="/home">
                    <Avatar alt="logo" src={logo} />
                </a>
                <Container className="navBar">
                    <Navbar.Brand href="/home">
                        <span className="wl-navbar-items">
                            <FaHome />
                            <span className="item">Home</span>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Brand href={`/adminUi/${id}`}>
                        {isAdmin === "true" ? (
                            <span className="wl-navbar-items">
                                <RiAdminFill />
                                <span className="item">Admin</span>
                            </span>
                        ) : null}
                    </Navbar.Brand>
                    <Navbar.Brand href={`/profile/${id}`}>
                        <Avatar alt="Remy Sharp" src={user.photo} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown
                            title={
                                travellerSelected ? (
                                    <span>
                                        <IoTicket size="25px" /> Find Travellers
                                    </span>
                                ) : hostSelected ? (
                                    <span>
                                        <IoIosPerson size="25px" /> Find Hosts
                                    </span>
                                ) : discoverSelected ? (
                                    <span>
                                        <RiCompassDiscoverLine size="25px" />
                                        Discover
                                    </span>
                                ) : null
                            }
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item
                                href="#action/3.1"
                                onClick={handelDiscover}
                            >
                                <RiCompassDiscoverLine
                                    size="25px"
                                    color="grey"
                                />
                                Discover
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                href="#action/3.1"
                                onClick={findTravellers}
                            >
                                <IoTicket size="25px" color="grey" />
                                Find Travellers
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                href="#action/3.2"
                                onClick={findHosts}
                            >
                                <IoIosPerson size="25px" color="grey" />
                                Find Hosts
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex">
                            <div className="inputSearch">
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
                            </div>
                        </Form>
                        <div className="searchButton">
                            <ColorButton
                                variant="contained"
                                size="small"
                                className={classes.button}
                                startIcon={<FaSearch />}
                                onClick={handleSearch}
                            >
                                Search
                            </ColorButton>
                        </div>
                        <div className="searchButton-responsive">
                            <SearchButtonResponsive
                                variant="contained"
                                size="small"
                                className={classes.rspButton}
                                startIcon={<FaSearch size="15px" />}
                                onClick={handleSearch}
                            ></SearchButtonResponsive>
                        </div>
                        <div>
                            <FormGroup>
                                <FormControlLabel
                                    labelPlacement={initState ? "end" : "start"}
                                    label={
                                        initState
                                            ? "Accept Guests"
                                            : "Stop Hosting"
                                    }
                                    control={
                                        <Switch
                                            checked={initState}
                                            onChange={toggleChecked}
                                            // onClick={acceptGuests}
                                            // value={isHost ? "on" : "off"}
                                        />
                                    }
                                />
                            </FormGroup>
                        </div>
                        <div className="settigns-dropdown">
                            <MDropDown />
                        </div>
                    </Nav>
                </Container>
                {/* <div className="wl-responsive-menu">
                    <Button>
                        <HiViewList size="35px" />
                    </Button>
                </div> */}
            </Navbar>
        </div>
    );
}

export default NavBar;
