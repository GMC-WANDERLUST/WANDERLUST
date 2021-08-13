import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { red, deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import "../UserProfil/HostItem.css";
import "../UserProfil/PostItem.css";
const ColorButtonRequest = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(deepPurple[100]),
        backgroundColor: deepPurple[100],
        "&:hover": {
            backgroundColor: deepPurple[400],
        },
    },
}))(Button);
const ColorButtonReport = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[100]),
        backgroundColor: red[100],
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
        width: "50%",
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

function PostDestinationItem({ post }) {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const saveUserId = () => {
        sessionStorage.setItem("randomId", post.user);
    };
    const handleReport = () => {
        Swal.fire({
            title: "Send Report?",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, report it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(
                        `/api/posts/reportPost/${id}`,
                        { id: post._id },
                        {
                            headers: {
                                jwt: token,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                        Swal.fire({
                            title: response.data.message.toUpperCase(),
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `OK`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        console.dir(error);
                    });
            }
        });
    };
    let dateTab = post.date.split("T");
    return (
        <div>
            <section className="wl-postDestinationItem-container">
                <div className="wl-postDestinationItem-box">
                    <h6>
                        {dateTab[0]} at {dateTab[1].split(".")[0]}
                    </h6>
                    <div className="wl-postItem-header">
                        <Link
                            to={
                                id === post.user
                                    ? `/profile/${post.user}`
                                    : `/uprofile/${post.user}`
                            }
                            onClick={saveUserId}
                        >
                            <Avatar
                                alt="profil_photo"
                                src={post.img}
                                className={classes.large}
                            />
                        </Link>
                        <Link
                            to={
                                id === post.user
                                    ? `/profile/${post.user}`
                                    : `/uprofile/${post.user}`
                            }
                            onClick={saveUserId}
                            style={{
                                textDecoration: "none",
                                color: "#F41F4E",
                            }}
                            className="post-link"
                        >
                            <h5>
                                {post.firstName} {post.lastName}
                            </h5>
                        </Link>
                    </div>
                    <div className="wl-postDestinationItem-body">
                        <div className="wl-postItem-line">
                            <h5 className="t5">Destination :</h5>
                            <h6>{post.destination.toUpperCase()}</h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5"> City :</h5>
                            <h6>{post.city.toUpperCase()}</h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5">From :</h5>
                            <h6>{post.check_in}</h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5">To :</h5>
                            <h6>{post.check_out}</h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5">Speaks :</h5>
                            <h6> {post.languages}</h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5">Phone :</h5>
                            <h6> {post.languages}</h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5"> Nombres of Guests:</h5>
                            <h6>{post.nbreOfGuests[0]} </h6>
                        </div>
                        <div className="wl-postItem-line">
                            <h5 className="t5">Decsription:</h5>
                            <h6>{post.description}</h6>
                        </div>
                    </div>
                </div>
                <div>
                    {id === post.user ? null : (
                        <div className="wl-postDestinationItem-buttons">
                            <ColorButtonRequest
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes.margin}
                            >
                                Host {post.firstName}
                            </ColorButtonRequest>
                            {post.isReported === 1 ? (
                                <ColorButtonReport
                                    disabled
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    onClick={handleReport}
                                >
                                    Report
                                </ColorButtonReport>
                            ) : (
                                <ColorButtonReport
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleReport}
                                    className={classes.margin}
                                >
                                    Report
                                </ColorButtonReport>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default PostDestinationItem;
