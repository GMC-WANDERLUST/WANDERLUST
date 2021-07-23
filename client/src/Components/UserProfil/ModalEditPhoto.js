import React, { useState } from "react";
import Modal from "react-modal";
import { userId, getToken } from "../../utils";
// import { fillUserProfile } from "../../redux/actions/userActions";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
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

function ModalEditPhoto({ action, data }) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
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
    let id = userId();

    const [uploadFile, setUploadFile] = useState();
    const [url, setUrl] = useState("");
    let token = getToken();
    const handelChange = (e) => {
        setUploadFile(e.target.files[0]);
    };
    // const dispatch = useDispatch();
    // const userObject = useSelector((state) => state.userReducer.user);
    const history = useHistory();

    // Photo Upload
    const submitForm = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("photo", uploadFile, uploadFile.name);
        // dispatch(fillUserProfile({ bodyFormData, token, id }));
        axios
            .put(`/api/profile/updateUserPhoto/${id}`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    jwt: token,
                },
                onUploadProgress: (progressEvent) =>
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Photo uploaded Successfully",
                        text: `Upload Progress : ${Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        )}
                        "%`,
                        showConfirmButton: false,
                        timer: 1200,
                    }),
                // console.log(
                //     "Upload Progress :" +
                //         Math.round(
                //             (progressEvent.loaded / progressEvent.total) *
                //                 100
                //         ) +
                //         "%"
                // ),
            })
            .then((response) => {
                setUrl(response.data.url);
            })
            .catch((error) => {
                console.dir(error);
            });

        // history.push(`/profile/${id}`);
    };
    const handleForward = () => {
        history.push(`/profile/${id}`);
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
                <h1>Please upload your profile photo</h1>
                <label>Select a file:</label>
                <form>
                    <input type="file" name="photo" onChange={handelChange} />
                    <button type="button" onClick={submitForm}>
                        Upload
                    </button>
                </form>
                {url ? (
                    <img src={url} alt="profile_photo" width="250px" />
                ) : (
                    <img src={data} alt="profile_photo" width="90px" />
                )}
                <button onClick={closeModal}>OK</button>
            </Modal>
        </div>
    );
}

export default ModalEditPhoto;
