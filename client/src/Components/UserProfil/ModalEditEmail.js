import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";
import { useSelector } from "react-redux";
import {
    openEmailModal,
    closeEmailModal,
} from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { logout } from "../../utils";
import { useHistory } from "react-router";
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

function ModalEditEmail({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    let id = userId();
    let token = getToken();
    let subtitle;
    const [newData, setNewData] = useState("");
    const testEmail = useSelector((state) => state.modalEmailReducer.testEmail);
    const dispatch = useDispatch();
    const history = useHistory();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function handleclose() {
        dispatch(closeEmailModal());
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
            denyButtonText: `Don't save`,
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`/api/user/editEmail/${id}`, newData, {
                        headers: {
                            jwt: token,
                        },
                    })
                    .then((response) => {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                        });
                        dispatch(closeEmailModal());
                        logout();
                        history.push("/login");
                    })
                    .catch((error) =>
                        Swal.fire(error.response.data.message, "", "error")
                    );
                dispatch(openEmailModal());
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <div>
            <Modal
                isOpen={testEmail}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleclose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>EDIT EMAIL</h2>
                <button onClick={handleclose}>Close</button>
                <form>
                    <input
                        type="text"
                        name="email"
                        id="myInput"
                        placeholder="New Email"
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

export default ModalEditEmail;
