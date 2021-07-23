import React from "react";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import ModalEditPassword from "./ModalEditPassword";
import ModalEditEmail from "./ModalEditEmail";
import { useDispatch } from "react-redux";
import { openModal, openEmailModal } from "../../redux/actions/userActions";

function DropDown() {
    const dispatch = useDispatch();
    const handleopenModal = () => {
        dispatch(openModal());
    };
    const handleopenEmailModal = () => {
        dispatch(openEmailModal());
    };
    return (
        <React.Fragment>
            <ModalEditPassword />
            <ModalEditEmail />
            <Dropdown as={ButtonGroup}>
                <Button variant="success">Profile Settings</Button>
                <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                />

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                        Edit Personal Informations
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={handleopenModal}>
                        Change Password
                    </Dropdown.Item>
                    <Dropdown.Item
                        href="#/action-2"
                        onClick={handleopenEmailModal}
                    >
                        Change Email
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Accept Guests
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default DropDown;
