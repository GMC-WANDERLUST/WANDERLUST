import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Navbar, Nav, Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { logout } from "../../utils";
import "./NavBar.css";
import { red } from "@material-ui/core/colors";
import { FiLogOut } from "react-icons/fi";
import "../UserProfil/MDropDown.css";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
        fontSize: "0.6em",
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

const LogOutButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700],
        },
    },
}))(Button);

function NavBarPhoto({ rId }) {
    const classes = useStyles();
    const history = useHistory();
    const handleLogout = () => {
        logout();
        history.push("/");
    };
    return (
        <div className="wl-NavBar-container-logout">
            <Navbar
                bg="transparent"
                variant="light"
                expand
                fixed="top"
                className="navbar-box-logout"
            >
                <Container>
                    <Nav className="me-auto-logout">
                        <div className="navBar-logout">
                            <div className="searchButton-logout">
                                <LogOutButton
                                    variant="contained"
                                    size="small"
                                    type="button"
                                    startIcon={<FiLogOut />}
                                    className={classes.button}
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </LogOutButton>
                            </div>
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

export default NavBarPhoto;
