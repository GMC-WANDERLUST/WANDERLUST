import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import hoursToMilliseconds from "date-fns/hoursToMilliseconds/index.js";
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
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { red, yellow } from "@material-ui/core/colors";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "../UserProfil/HostItem.css";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[700]),
        backgroundColor: yellow[700],
        "&:hover": {
            backgroundColor: yellow[500],
        },
    },
}))(Button);
const ColorButtonDelete = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red["A700"]),
        backgroundColor: red["A700"],
        "&:hover": {
            backgroundColor: red["A400"],
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
                    <div className="wl-hostItem-dataList">
                        <p>
                            {dateTab[0]} at {dateTab[1].split(".")[0]}
                        </p>
                        <div className="wl-hostItem-header">
                            <Avatar
                                alt="profil_photo"
                                src={host.img}
                                className={classes.large}
                            />
                            <h5>
                                {host.firstName} {host.lastName}
                            </h5>
                        </div>
                        <div className="wl-hostItem-body">
                            <div className="wl-hostItem-line">
                                <h6 className="t5">Residence :</h6>
                                <p>{host.residence.toUpperCase()}</p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5"> City :</h6>
                                <p>{host.city.toUpperCase()}</p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5">Available on :</h6>
                                <p>{host.available}</p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5">Speaks :</h6>
                                <p> {host.languages}</p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5"> Nombres of Rooms:</h6>
                                <p>{host.nbreOfRooms} </p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5"> Nombres of Beds:</h6>
                                <p>{host.nbreOfBeds} </p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5"> Price:</h6>
                                <p>{host.price} $ </p>
                            </div>
                            <div className="wl-hostItem-line">
                                <h6 className="t5"> Description:</h6>
                                <p>{host.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default HostItem;
