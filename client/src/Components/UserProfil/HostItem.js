import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment-timezone";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { red, pink } from "@material-ui/core/colors";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./HostItem.css";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(pink[50]),
        backgroundColor: pink[50],
        "&:hover": {
            backgroundColor: "#FF0BAC",
            color: "white",
        },
    },
}))(Button);
const ColorButtonDelete = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[50]),
        backgroundColor: red[50],
        "&:hover": {
            backgroundColor: red["A700"],
            color: "white",
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    margin: {
        margin: theme.spacing(1),
        fontSize: "0.7em",
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
        // height: "100px",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
}));

function HostItem({ host }) {
    const classes = useStyles();
    const id = userId();
    const token = getToken();
    const [editHost, setEditHost] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    var n = Date.now();
    const [selectedDate, setSelectedDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );
    const handleDateChange = (date) => {
        setEditHost({
            ...editHost,
            available: moment(date).format("YYYY-MM-DD"),
        });
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };
    const handelChange = (e) => {
        setEditHost({ ...editHost, [e.target.name]: e.target.value });
    };
    const showEditHost = () => {
        setShowEdit(true);
    };
    const cancelEdit = () => {
        setShowEdit(false);
    };
    const handleSaveEdit = () => {
        axios
            .put(`/api/host/editHosting/${id}`, editHost, {
                headers: {
                    jwt: token,
                    data: host._id,
                },
            })
            .then((response) => {
                Swal.fire({
                    title: "Save changes",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Save`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                });
            })
            .catch((error) => console.dir(error));
    };
    const handelDeleteHost = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/host/deleteHosting/${id}`, {
                        headers: {
                            jwt: token,
                            data: host._id,
                        },
                    })
                    .then((response) => {
                        Swal.fire({
                            title: response.data.message,
                            showDenyButton: false,
                            showCancelButton: false,
                            icon: "success",
                            confirmButtonText: `Save`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire(error.data.data.message, "error");
                        setShowEdit(true);
                    });
            }
        });
    };
    let dateTab = host.date.split("T");
    return (
        <React.Fragment>
            <section className="wl-hostItem-container">
                <div className="wl-hostItem-box">
                    {showEdit ? null : (
                        <div className="wl-hostItem-dataList">
                            <h6>
                                {dateTab[0]} at {dateTab[1].split(".")[0]}
                            </h6>
                            <div className="wl-hostItem-header">
                                <Avatar
                                    alt="profil_photo"
                                    src={host.img}
                                    className={classes.large}
                                />
                                <h6>
                                    {host.firstName} {host.lastName}
                                </h6>
                            </div>
                            <div className="wl-hostItem-body">
                                <div className="wl-hostItem-row">
                                    <div className="wl-hostItem-line">
                                        <h5 className="t5">Residence :</h5>
                                        <h6>{host.residence.toUpperCase()}</h6>
                                    </div>
                                    <div className="wl-hostItem-first-line">
                                        <h5 className="t5"> City :</h5>
                                        <h6>{host.city.toUpperCase()}</h6>
                                    </div>
                                </div>
                                <div className="wl-hostItem-line">
                                    <h5 className="t5">Available on :</h5>
                                    <h6>{host.available}</h6>
                                </div>
                                <div className="wl-hostItem-line">
                                    <h5 className="t5">Languages :</h5>
                                    <h6> {host.languages}</h6>
                                </div>
                                <div className="wl-hostItem-row">
                                    <div className="wl-hostItem-line">
                                        <h5 className="t5">
                                            Nombres of Rooms:
                                        </h5>
                                        <h6>{host.nbreOfRooms} </h6>
                                    </div>
                                    <div className="wl-hostItem-first-line">
                                        <h5 className="t5">Nombres of Beds:</h5>
                                        <h6>{host.nbreOfBeds} </h6>
                                    </div>
                                </div>
                                <div className="wl-hostItem-line">
                                    <h5 className="t5"> Price:</h5>
                                    <h6>{host.price} $ </h6>
                                </div>
                                <div className="wl-hostItem-line">
                                    <h5 className="t5"> Description:</h5>
                                    <h6>{host.description}</h6>
                                </div>
                            </div>
                            <div className="wl-hostItem-buttons">
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    onClick={showEditHost}
                                >
                                    Edit
                                </ColorButton>
                                <ColorButtonDelete
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    onClick={handelDeleteHost}
                                >
                                    Delete
                                </ColorButtonDelete>
                            </div>
                        </div>
                    )}
                    {showEdit ? (
                        <div className="wl-hostItem-core">
                            <main
                                className={classes.layout}
                                onChange={handelChange}
                                className="wl-hostItem-edit"
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
                                                id="City"
                                                name="city"
                                                label="City"
                                                defaultValue={host.city}
                                                defaultValue={host.city}
                                                fullWidth
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="nbreOfRooms"
                                                name="nbreOfRooms"
                                                label="Nombre of Rooms"
                                                defaultValue={host.nbreOfRooms}
                                                fullWidth
                                                // autoComplete="Occupation"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="nbreOfBeds"
                                                name="nbreOfBeds"
                                                label="Nombre of Beds"
                                                defaultValue={host.nbreOfBeds}
                                                fullWidth
                                                // autoComplete="Occupation"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="price"
                                                name="price"
                                                label="Price"
                                                defaultValue={host.price}
                                                fullWidth
                                                // autoComplete="Occupation"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="description"
                                                name="description"
                                                label="A brief description"
                                                defaultValue={host.description}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                >
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        name="check_in"
                                                        format="yyyy-MM-dd"
                                                        margin="normal"
                                                        id="Check In"
                                                        label="Check In"
                                                        value={selectedDate}
                                                        onChange={
                                                            handleDateChange
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
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        size="small"
                                        className={classes.button}
                                        // startIcon={<SaveIcon />}
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </Button>
                                </React.Fragment>
                            </main>
                        </div>
                    ) : null}
                </div>
            </section>
        </React.Fragment>
    );
}

export default HostItem;
