import React from "react";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import ModalEditPassword from "./ModalEditPassword";
import ModalEditEmail from "./ModalEditEmail";
import ModalAddHosting from "./ModalAddHosting";
import { useDispatch } from "react-redux";
import { openModal, openEmailModal } from "../../redux/actions/userActions";
import { openHostingModal } from "../../redux/actions/hostActions";
import { userId, getToken, getIsHost, saveIsHost } from "../../utils";
import axios from "axios";
import Swal from "sweetalert2";

function DropDown() {
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
                    console.log(response);
                    saveIsHost(false);
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't to stop accepting guests!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Continue!",
                    }).then((result) => {
                        if (result.isConfirmed) {
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
        <React.Fragment>
            <ModalEditPassword />
            <ModalEditEmail />
            <ModalAddHosting />
            <Dropdown as={ButtonGroup}>
                <Button variant="success">Profile Settings</Button>
                <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                />

                <Dropdown.Menu>
                    <Dropdown.Item
                        href={`/updateprofile/${id}`}
                    >
                        Update Personal Informations
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
                    <Dropdown.Item href="#/action-3" onClick={acceptGuests}>
                        {isHost === "true"
                            ? "Stop Accepting Guests"
                            : "Accept Guests"}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default DropDown;
