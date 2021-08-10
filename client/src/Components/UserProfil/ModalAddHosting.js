import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken, saveIsHost } from "../../utils";
import { useSelector } from "react-redux";
import {
    openHostingModal,
    closeHostingModal,
} from "../../redux/actions/hostActions";
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
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "65%",
        height: "70%",
        backgroundColor: "whitesmoke",
    },
};

Modal.setAppElement("#root");

function ModalAddHosting({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    let subtitle;

    const [newData, setNewData] = useState("");
    const openHosting = useSelector(
        (state) => state.hostingReducer.openHosting
    );
    const dispatch = useDispatch();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#006064";
    }
    function handleclose() {
        dispatch(closeHostingModal());
        // window.location.reload()
    }
    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };
    var n = Date.now();
    const [selectedDate, setSelectedDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );

    const handleDateChange = (date) => {
        setNewData({
            ...newData,
            available: moment(date).format("YYYY-MM-DD"),
        });
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };
    ///////////////////////////////////////////////////////////////////////////////////
    // SAVE CHANGES
    const saveNewData = () => {
        axios
            .post(`/api/host/newHosting/${id}`, newData, {
                headers: {
                    jwt: token,
                },
            })
            .then(() => {
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
                            .put(
                                `/api/user/editStatus/${id}`,
                                {},
                                {
                                    headers: {
                                        jwt: token,
                                    },
                                }
                            )
                            .then((response) => {
                                saveIsHost(response.data.new.isHost);
                                Swal.fire({
                                    title: `${response.data.message}`,
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Ok`,
                                    icon: "success",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            })
                            .catch((error) => console.dir(error));
                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                });

                dispatch(closeHostingModal());
            })
            .catch((error) => {
                console.dir(error);
                Swal.fire(error.response.data.message, "", "error");
                dispatch(openHostingModal());
            });
    };

    return (
        <div>
            <Modal
                isOpen={openHosting}
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
                        Start Hosting Now!
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
                                            id="city"
                                            name="city"
                                            label="City"
                                            placeholder="exp : Berlin, Paris..."
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            required
                                            id="nbreOfRooms"
                                            name="nbreOfRooms"
                                            label="Nombre of Rooms"
                                            placeholder="Nombre of Rooms"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    {/* <Grid item xs={4} sm={4}></Grid> */}
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            required
                                            id="nbreOfBeds"
                                            name="nbreOfBeds"
                                            label="Nombre of Beds"
                                            placeholder="Nombre of Beds"
                                            fullWidth
                                            // autoComplete="Occupation"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            id="price"
                                            name="price"
                                            label="Price"
                                            placeholder="Price $"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            id="description"
                                            name="description"
                                            label="Description"
                                            placeholder="A brief description"
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
                                                    id="Availability"
                                                    label="Availability"
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
                    {/*<button onClick={handleclose}>Close</button>
                <form>
                    <input
                        type="text"
                        name="city"
                        placeholder="city"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nbreOfRooms"
                        placeholder="Number of rooms"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nbreOfBeds"
                        placeholder="Number of beds"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price $"
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="available"
                        placeholder="From"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="A brief description"
                        onChange={handleChange}
                    />
                    <button type="button" onClick={saveNewData}>
                        Save
                    </button>
                </form> */}
                </div>
            </Modal>
        </div>
    );
}

export default ModalAddHosting;
