import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import Avatar from "@material-ui/core/Avatar";
import "./PostItem.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, yellow } from "@material-ui/core/colors";
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

function PostItem({ post }) {
    const classes = useStyles();
    const id = userId();
    const token = getToken();
    const [editPost, setEditPost] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    // const [newData, setNewData] = useState("");
    var n = Date.now();
    const [selectedDate, setSelectedDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );
    const handleDateChange = (date) => {
        setEditPost({
            ...editPost,
            check_in: moment(date).format("YYYY-MM-DD"),
        });
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };
    const [selectedSecondDate, setSelectedSecondDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );
    const handleSecondDateChange = (date) => {
        setEditPost({
            ...editPost,
            check_out: moment(date).format("YYYY-MM-DD"),
        });
        setSelectedSecondDate(moment(date).format("YYYY-MM-DD"));
    };
    const handelChange = (e) => {
        setEditPost({ ...editPost, [e.target.name]: e.target.value });
    };
    const showEditPost = () => {
        setShowEdit(true);
    };
    const cancelEdit = () => {
        setShowEdit(false);
    };
    const handleSaveEdit = () => {
        axios
            .put(
                `/api/posts/editPost/${id}`,
                { editPost, _id: post._id },
                {
                    headers: {
                        jwt: token,
                    },
                }
            )
            .then((response) => {
                Swal.fire({
                    title: "Save changes",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                    showLoaderOnConfirm: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Save`,
                            showLoaderOnConfirm: true,
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
    const handelDeletePost = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/posts/deletePost/${id}`, {
                        headers: {
                            jwt: token,
                            _id: post._id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        Swal.fire({
                            title: response.data.message,
                            showDenyButton: false,
                            showCancelButton: false,
                            icon: "success",
                            confirmButtonText: `Save`,
                            showLoaderOnConfirm: true,
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
    let dateTab = post.date.split("T");
    return (
        <React.Fragment>
            <section className="wl-postItem-container">
                <div className="wl-postItem-box">
                    {showEdit ? null : (
                        <div className="wl-postItem-dataList">
                            <p>
                                {dateTab[0]} at {dateTab[1].split(".")[0]}
                            </p>
                            <div className="wl-postItem-header">
                                <Avatar
                                    alt="profil_photo"
                                    src={post.img}
                                    className={classes.large}
                                />
                                <h5>
                                    {post.firstName} {post.lastName}
                                </h5>
                            </div>
                            <div className="wl-postItem-body">
                                <div className="wl-postItem-line">
                                    <h6 className="t5">Destination :</h6>
                                    <p>{post.destination.toUpperCase()}</p>
                                </div>
                                <div className="wl-postItem-line">
                                    <h6 className="t5"> City :</h6>
                                    <p>{post.city.toUpperCase()}</p>
                                </div>
                                <div className="wl-postItem-line">
                                    <h6 className="t5">From :</h6>
                                    <p>
                                        {post.check_in} To {post.check_out}
                                    </p>
                                </div>
                                <div className="wl-postItem-line">
                                    <h6 className="t5">Speaks :</h6>
                                    <p> {post.languages}</p>
                                </div>
                                <div className="wl-postItem-line">
                                    <h6 className="t5"> Nombres of Guests:</h6>
                                    <p>{post.nbreOfGuests[0]} </p>
                                </div>
                                <p>" {post.description} "</p>
                            </div>
                            <div className="wl-postItem-buttons">
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    onClick={showEditPost}
                                >
                                    Edit
                                </ColorButton>
                                <ColorButtonDelete
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    onClick={handelDeletePost}
                                >
                                    Delete
                                </ColorButtonDelete>
                            </div>
                        </div>
                    )}
                    {showEdit ? (
                        <div className="wl-postItem-core">
                            <main
                                className={classes.layout}
                                onChange={handelChange}
                                className="wl-postItem-edit"
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
                                                id="standard-basic"
                                                name="destination"
                                                label="Destination"
                                                defaultValue={post.destination}
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
                                                defaultValue={post.city}
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
                                                defaultValue={post.nbreOfGuests}
                                                fullWidth
                                                // autoComplete="Occupation"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="Hobbies"
                                                name="description"
                                                label="A brief description"
                                                defaultValue={post.description}
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
                                                        name="check_out"
                                                        format="yyyy-MM-dd"
                                                        margin="normal"
                                                        id="date-picker-inline"
                                                        label="Check Out"
                                                        value={
                                                            selectedSecondDate
                                                        }
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

export default PostItem;
