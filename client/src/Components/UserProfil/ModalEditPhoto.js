import React, { useState } from "react";
import Modal from "react-modal";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import axios from "axios";
import "./Modals.css";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { FaPen } from "react-icons/fa";

const customStyles = {
    content: {
        top: "55%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "80%",
        paddingTop: "0px",
    },
};
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
Modal.setAppElement("#root");

function ModalEditPhoto({ action, data }) {
    const classes = useStyles();

    // let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }
    function closeModal() {
        setIsOpen(false);
        // window.location.reload();
    }

    const handleSave = () => {
        setIsOpen(false);
        window.location.reload();
    };
    let id = userId();
    let token = getToken();

    const [uploadFile, setUploadFile] = useState();
    const [url, setUrl] = useState("");
    const handelChange = (e) => {
        setUploadFile(e.target.files[0]);
    };

    // Photo Upload
    const submitForm = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("photo", uploadFile, uploadFile.name);
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
            })
            .then((response) => {
                console.log(response.data);
                setUrl(response.data.url);
            })
            .catch((error) => {
                console.dir(error);
            });
    };
    return (
        <div className="wl-modal-update-photo-container">
            <label className="btn-edit-photo">
                <FaPen size="15px" />
                <input type="checkbox" title={action} onClick={openModal} />
            </label>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <CloseButton aria-label="Hide" onClick={closeModal}>
                    close
                </CloseButton>
                <div className="wl-modal-update-photo-box">
                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>EDIT</h2> */}
                    <h5>UPDATE YOUR PROFILE PHOTO</h5>

                    <div className="wl-modal-update-photo-photoArea">
                        {url ? (
                            <img src={url} alt="profile_photo" width="280px" />
                        ) : (
                            <img src={data} alt="profile_photo" width="280px" />
                        )}
                    </div>
                    <form className="wl-modal-update-photo-uploadBox">
                        <input
                            type="file"
                            name="photo"
                            onChange={handelChange}
                        />
                        <div className="wl-modal-update-photo-saveBox">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<PublishIcon />}
                                className={classes.button}
                                onClick={submitForm}
                            >
                                Upload
                            </Button>
                            <Button
                                disabled={url ? false : true}
                                variant="contained"
                                color="default"
                                startIcon={<SaveIcon />}
                                className={classes.button}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default ModalEditPhoto;
