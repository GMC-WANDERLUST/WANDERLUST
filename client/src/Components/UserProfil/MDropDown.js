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

function MDropDown() {
    let id = userId();
    let token = getToken();
    let isHost = getIsHost();
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

                    {/* <NavDropdown.Item onClick={acceptGuests}>
                        {isHost === "true"
                            ? "Accept Guests"
                            : "Stop Accepting Guests"}
                    </NavDropdown.Item> */}
                </NavDropdown>
            </Nav>
        </div>
    );
}

export default MDropDown;
