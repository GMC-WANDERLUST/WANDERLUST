import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";
import { useSelector } from "react-redux";
import { close, openModal } from "../../redux/actions/userActions";
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

function ModalEditPassword({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    let id = userId();
    let token = getToken();
    let subtitle;
    const [newData, setNewData] = useState("");
    const [show, setShow] = useState(false);
    const test = useSelector((state) => state.modalReducer.test);
    const dispatch = useDispatch();
    const history = useHistory();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function handleclose() {
        dispatch(close());
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
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios
                    .put(`/api/user/editPassword/${id}`, newData, {
                        headers: {
                            jwt: token,
                        },
                    })
                    .then((response) => {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                        });
                        dispatch(close());
                        logout();
                        history.push("/login");
                    })
                    .catch((error) =>
                        Swal.fire(error.response.data.message, "", "error")
                    );
                // Swal.fire("Saved!", "", "success");
                dispatch(openModal());
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };
    const showPasswords = () => {
        setShow(!show);
    };
    // window.onload = (e) => {
    //     const myInput = document.getElementById("myInput");
    //     myInput.onpaste = (e) => e.preventDefault();
    // };
    ///////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <Modal
                isOpen={test}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleclose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    EDIT PASSWORD
                </h2>
                <button onClick={handleclose}>Close</button>
                <form>
                    <input type="button" value="Show" onClick={showPasswords} />
                    <input
                        type={show ? "text" : "password"}
                        autoComplete="password"
                        name="oldPassword"
                        id="myInput"
                        placeholder="Old Password"
                        onChange={handleChange}
                    />
                    <input
                        type={show ? "text" : "password"}
                        name="newpassword"
                        autoComplete="newpassword"
                        placeholder="New Password"
                        onChange={handleChange}
                    />
                    <input
                        type={show ? "text" : "password"}
                        name="repeat_newpassword"
                        autoComplete="repeat_newpassword"
                        placeholder="New Password"
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

export default ModalEditPassword;
