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

function ModalEditEmail({ data }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    const classes = useStyles();
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
        subtitle.style.color = "#006064";
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
    console.log(data);
    return (
        <div>
            <Modal
                isOpen={testEmail}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleclose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <CloseButton aria-label="Hide" onClick={handleclose}>
                    close
                </CloseButton>
                <div className="wl-modal-edit-firstname-box">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Edit E-mail
                    </h2>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-basic"
                            label="NEW E-MAIL"
                            name="email"
                            onChange={handleChange}
                        />
                    </form>
                    <div>
                        <ColorButton
                            startIcon={<DoneRoundedIcon />}
                            variant="contained"
                            color="default"
                            onClick={saveNewData}
                        >
                            OK
                        </ColorButton>
                    </div>
                </div>
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>EDIT EMAIL</h2> */}
                {/* <button onClick={handleclose}>Close</button>
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
                </form> */}
            </Modal>
        </div>
    );
}

export default ModalEditEmail;
