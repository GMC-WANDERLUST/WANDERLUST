import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken, saveIsHost } from "../../utils";
import { useSelector } from "react-redux";
import {
    openHostingModal,
    closeHostingModal,
} from "../../redux/actions/hostActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function ModalAddHosting({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    let id = userId();
    let token = getToken();
    let subtitle;
    const [newData, setNewData] = useState("");
    const openHosting = useSelector(
        (state) => state.hostingReducer.openHosting
    );
    const dispatch = useDispatch();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function handleclose() {
        dispatch(closeHostingModal());
        // window.location.reload()
    }
    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    ///////////////////////////////////////////////////////////////////////////////////
    // SAVE CHANGES
    const saveNewData = () => {
        axios
            .post(`/api/host/newHosting/${id}`, newData, {
                headers: {
                    jwt: token,
                },
            })
            .then(() => {
                Swal.fire({
                    title: "Do you want to save the changes?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                    showLoaderOnConfirm: true,
                    denyButtonText: `Don't save`,
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
                                saveIsHost(response.data.new.isHost);
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
                            })
                            .catch((error) => console.dir(error));
                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                });

                dispatch(closeHostingModal());
            })
            .catch((error) => {
                console.dir(error);
                Swal.fire(error.response.data.message, "", "error");
                dispatch(openHostingModal());
            });
    };
    // window.onload = (e) => {
    //     const myInput = document.getElementById("myInput");
    //     myInput.onpaste = (e) => e.preventDefault();
    // };
    ///////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <Modal
                isOpen={openHosting}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleclose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Add a new HOSTING post
                </h2>
                <button onClick={handleclose}>Close</button>
                <form>
                    <input
                        type="text"
                        name="city"
                        placeholder="city"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nbreOfRooms"
                        placeholder="Number of rooms"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nbreOfBeds"
                        placeholder="Number of beds"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price $"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="A brief description"
                        onChange={handleChange}
                    />
                    <button type="button" onClick={saveNewData}>
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default ModalAddHosting;
