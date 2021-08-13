import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import ModalEditPassword from "./ModalEditPassword";
import ModalEditEmail from "./ModalEditEmail";
import ModalAddHosting from "./ModalAddHosting";
import { useDispatch } from "react-redux";
import { openModal, openEmailModal } from "../../redux/actions/userActions";
import { openHostingModal } from "../../redux/actions/hostActions";
import { userId, getToken, getIsHost, saveIsHost } from "../../utils";
import { IoSettings } from "react-icons/io5";
import { GrUpdate, GrMail } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import "./MDropDown.css";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../utils";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
        fontSize: "0.6em",
        width: "100px",
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

function MDropDown() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    let isHost = getIsHost();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleopenModal = () => {
        dispatch(openModal());
    };
    const handleopenEmailModal = () => {
        dispatch(openEmailModal());
    };
    const openHosting = () => {
        dispatch(openHostingModal());
    };
    const handleLogout = () => {
        logout();
        history.push("/");
        window.location.reload();
    };
    return (
        <div>
            <ModalEditPassword />
            <ModalEditEmail />
            <ModalAddHosting />
            <Nav>
                <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={
                        <span>
                            <IoSettings size="22px" /> Settings
                        </span>
                    }
                    menuvariant="dark"
                >
                    <NavDropdown.Item href={`/updateprofile/${id}`}>
                        <GrUpdate /> Update Personal Informations
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleopenModal}>
                        <RiLockPasswordFill /> Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleopenEmailModal}>
                        <GrMail /> Change E-mail
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <div className="searchButton">
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
                </NavDropdown>
            </Nav>
        </div>
    );
}

export default MDropDown;
