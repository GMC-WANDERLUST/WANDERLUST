import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "@material-ui/core/Button";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { blue } from "@material-ui/core/colors";
import { FaPen } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        height: "40%",
    },
};
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[800]),
        backgroundColor: blue[800],
        "&:hover": {
            backgroundColor: blue[500],
        },
    },
}))(Button);

Modal.setAppElement("#root");

function ModalEditLastName({ action, data }) {
    const classes = useStyles();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [newData, setNewData] = useState("");
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = "#006064";
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
            <label>
                <FaPen size="15px" color="grey" />
                <input
                    type="checkbox"
                    title="Edit First Name"
                    onClick={openModal}
                />
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
                <div className="wl-modal-edit-firstname-box">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Edit your Last Name
                    </h2>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-basic"
                            label="Last Name"
                            name="LastName"
                            defaultValue={data}
                            onChange={handleChange}
                        />
                    </form>
                    <div>
                        <ColorButton
                            size="small"
                            startIcon={<DoneRoundedIcon />}
                            variant="contained"
                            color="default"
                            onClick={saveNewData}
                        >
                            OK
                        </ColorButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalEditLastName;
