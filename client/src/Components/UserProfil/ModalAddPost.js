import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";
import { useSelector } from "react-redux";
import { closeAddPost } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment-timezone";
import "./Modals.css";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(1) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding: theme.spacing(3),
        },
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
}));

const customStyles = {
    content: {
        top: "55%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "65%",
        height: "85%",
        backgroundColor: "whitesmoke",
    },
};

Modal.setAppElement("#root");

function ModalAddPost() {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    let subtitle;
    var n = Date.now();
    const [selectedDate, setSelectedDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );
    const handleDateChange = (date) => {
        setNewData({
            ...newData,
            check_in: moment(date).format("YYYY-MM-DD"),
        });
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };
    const [selectedSecondDate, setSelectedSecondDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );
    const handleSecondDateChange = (date) => {
        setNewData({
            ...newData,
            check_out: moment(date).format("YYYY-MM-DD"),
        });
        setSelectedSecondDate(moment(date).format("YYYY-MM-DD"));
    };
    const [newData, setNewData] = useState("");
    const openPost = useSelector((state) => state.postReducer.openPost);
    const dispatch = useDispatch();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#006064";
    }
    function handleclose() {
        dispatch(closeAddPost());
    }
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value,
        });
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
                <div className="modal-add-post-close-button">
                    <CloseButton aria-label="Hide" onClick={handleclose}>
                        close
                    </CloseButton>
                </div>
                <div className="wl-modal-add-post-container">
                    <h5 ref={(_subtitle) => (subtitle = _subtitle)}>
                        START YOUR JOURNEY NOW!
                    </h5>
                    <main className={classes.layout}>
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
                                <Grid container spacing={3}>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            required
                                            id="Destination"
                                            name="destination"
                                            label="Destination"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            required
                                            id="City"
                                            name="city"
                                            label="City"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    {/* <Grid item xs={4} sm={4}></Grid> */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="nbreOfGuests"
                                            name="nbreOfGuests"
                                            label="Nombre of Guests"
                                            fullWidth
                                            // autoComplete="Occupation"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="Hobbies"
                                            name="description"
                                            label="A brief description"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <Grid container alignItems="center">
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    name="check_in"
                                                    format="yyyy-MM-dd"
                                                    margin="normal"
                                                    id="Check In"
                                                    label="Check In"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        "aria-label":
                                                            "change date",
                                                    }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <Grid container alignItems="center">
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    name="check_out"
                                                    format="yyyy-MM-dd"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Check Out"
                                                    value={selectedSecondDate}
                                                    onChange={
                                                        handleSecondDateChange
                                                    }
                                                    KeyboardButtonProps={{
                                                        "aria-label":
                                                            "change date",
                                                    }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    onClick={saveNewData}
                                >
                                    Save
                                </Button>
                            </React.Fragment>
                        </Paper>
                    </main>
                </div>
            </Modal>
        </div>
    );
}

export default ModalAddPost;
