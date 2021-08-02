import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";
import { useSelector } from "react-redux";
import { closeAddPost } from "../../redux/actions/userActions";
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

function ModalAddPost({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    let id = userId();
    let token = getToken();
    let subtitle;
    const [newData, setNewData] = useState("");
    const openPost = useSelector((state) => state.postReducer.openPost);
    const dispatch = useDispatch();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function handleclose() {
        dispatch(closeAddPost());
    }
    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    ///////////////////////////////////////////////////////////////////////////////////
    // SAVE CHANGES
    const saveNewData = () => {
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
                    .post(`/api/posts/addnewpost/${id}`, newData, {
                        headers: {
                            jwt: token,
                        },
                    })
                    .then((response) => {
                        console.log("post :", response);
                        Swal.fire({
                            title: `${response.data.message}`,
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Ok`,
                            icon: "success",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleclose();
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        console.dir(error);
                        Swal.fire(error.response.data.message, "", "error");
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <div>
            <Modal
                isOpen={openPost}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleclose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Let's GO!</h2>
                <button onClick={handleclose}>Close</button>
                <form>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="date"
                        name="check_in"
                        placeholder="From"
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="date"
                        name="check_out"
                        placeholder="To"
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="nbreOfGuests"
                        placeholder="Nombre of Guests"
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="description"
                        placeholder="A brief description"
                        onChange={handleChange}
                    />
                    <br />
                    <button type="button" onClick={saveNewData}>
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default ModalAddPost;
