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
import CloseButton from "react-bootstrap/CloseButton";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./Modals.css";
///////////////////////////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(2) * 1)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding: theme.spacing(3),
        },
        height: "50hv",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(1) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
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
        width: "50%",
        height: "55%",
        backgroundColor: "whitesmoke",
    },
};

Modal.setAppElement("#root");

function ModalEditPassword({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    const classes = useStyles();
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
        subtitle.style.color = "#006064";
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
            showLoaderOnConfirm: true,
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
                <div className="modal-edit-password-close-button">
                    <CloseButton aria-label="Hide" onClick={handleclose}>
                        close
                    </CloseButton>
                </div>
                <h5 ref={(_subtitle) => (subtitle = _subtitle)}>
                    EDIT PASSWORD
                </h5>
                <div className="wl-modal-edit-password-container">
                    <main className={classes.layout}>
                        <div className="edit-password-body">
                            <Paper
                                className={classes.paper}
                                onChange={handleChange}
                            >
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    align="center"
                                ></Typography>
                                <React.Fragment>
                                    <Grid container spacing={1}>
                                        <div className="button">
                                            <Button
                                                // variant="contained"
                                                // color="primary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={
                                                    show ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )
                                                }
                                                onClick={showPasswords}
                                            >
                                                {/* {show ? "Hide":""} */}
                                            </Button>
                                        </div>
                                        <div className="box">
                                            <Grid item xs={4} sm={4}>
                                                <TextField
                                                    required
                                                    id="Password"
                                                    name="oldPassword"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    label="Old Password"
                                                    fullWidth
                                                    autoComplete="current-password"
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <TextField
                                                    required
                                                    id="newpassword"
                                                    name="newpassword"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    label="New Password"
                                                    fullWidth
                                                    // autoComplete="family-name"
                                                />
                                            </Grid>
                                            {/* <Grid item xs={4} sm={4}></Grid> */}
                                            <Grid item xs={6} sm={4}>
                                                <TextField
                                                    required
                                                    id="repeat_newpassword"
                                                    name="repeat_newpassword"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    label="Confirm"
                                                    fullWidth
                                                    // autoComplete="Occupation"
                                                />
                                            </Grid>
                                        </div>
                                    </Grid>
                                </React.Fragment>
                            </Paper>
                        </div>
                        <div className="edit-password-button">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                // className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={saveNewData}
                            >
                                Save
                            </Button>
                        </div>
                    </main>
                </div>
            </Modal>
        </div>
    );
}
export default ModalEditPassword;
