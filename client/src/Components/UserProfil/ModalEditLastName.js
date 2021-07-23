import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";

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

function ModalEditLastName({ action, data }) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [newData, setNewData] = useState("");
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function closeModal() {
        setIsOpen(false);
    }
    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };
    let id = userId();
    let token = getToken();
    const saveNewData = () => {
        axios
            .put(`/api/user/editUserLastName/${id}`, newData, {
                headers: {
                    jwt: token,
                },
            })
            .then((response) => console.log(response))
            .catch((error) => console.dir(error));
        closeModal();
        window.location.reload();
    };
    return (
        <div>
            <button onClick={openModal}>{action}</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>EDIT</h2>
                <button onClick={closeModal}>close</button>
                <input type="text" name="LastName" onChange={handleChange} />
                <button onClick={saveNewData}>OK</button>
            </Modal>
        </div>
    );
}

export default ModalEditLastName;
