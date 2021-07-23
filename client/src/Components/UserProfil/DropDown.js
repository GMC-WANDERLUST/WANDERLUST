import React, { useState } from "react";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import ModalEditPassword from "./ModalEditPassword";
import ModalEditEmail from "./ModalEditEmail";
import { useDispatch } from "react-redux";
import { openModal, openEmailModal } from "../../redux/actions/userActions";
import { userId, getToken } from "../../utils";
import axios from "axios";
import Swal from "sweetalert2";

function DropDown() {
    let id = userId();
    let token = getToken();
    const [host, setHost] = useState()
    const dispatch = useDispatch();
    const handleopenModal = () => {
        dispatch(openModal());
    };
    const handleopenEmailModal = () => {
        dispatch(openEmailModal());
    };
    const acceptGests = () => {
        // axios
        //     .put(
        //         `/api/user/editStatus/${id}`,
        //         {},
        //         {
        //             headers: {
        //                 jwt: token,
        //             },
        //         }
        //     )
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => console.dir(error));
        Swal.fire({
            title: host ?  "Stop accepting Guests? ":" You want to start Hosting!",
            text: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, CONTINUE!",
        }).then((result) => {
            if (result.isConfirmed) {
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
                        console.log(response)
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                        });
                        setHost(response.data.new.isHost)
                    })
                    .catch((error) =>
                        Swal.fire(error.response.data.message, "error")
                    );
            }
        });
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
                    <Dropdown.Item
                        href={`/updateprofile/${id}`}
                        target="_blank"
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
                    <Dropdown.Item href="#/action-3" onClick={acceptGests}>
                        Accept Guests
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default DropDown;
