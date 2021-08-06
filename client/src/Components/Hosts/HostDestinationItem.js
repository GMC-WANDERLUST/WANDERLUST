import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
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

function HostDestinationItem({ host }) {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const saveUserId = () => {
        sessionStorage.setItem("randomId", host.host);
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
                        `/api/host/reportHost/${id}`,
                        { id: host._id },
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
    let dateTab = host.date.split("T");

    return (
        <React.Fragment>
            <section className="wl-hostDestinationItem-container">
                <div className="wl-hostDestinationItem-box">
                    <h6>
                        {dateTab[0]} at {dateTab[1].split(".")[0]}
                    </h6>
                    <div className="wl-hostItem-header">
                        <Avatar
                            alt="profil_photo"
                            src={host.img}
                            className={classes.large}
                        />
                        <Link
                            to={`/uprofile/${host.host}`}
                            onClick={saveUserId}
                        >
                            <h5>
                                {host.firstName} {host.lastName}
                            </h5>
                        </Link>
                    </div>
                    <div className="wl-hostDestinationItem-body">
                        <div className="wl-hostItem-line">
                            <h5 className="t5">Residence :</h5>
                            <h6>{host.residence.toUpperCase()}</h6>
                        </div>
                        <div className="wl-hostItem-line">
                            <h5 className="t5"> City :</h5>
                            <h6>{host.city.toUpperCase()}</h6>
                        </div>
                        <div className="wl-hostItem-line">
                            <h5 className="t5">Available on :</h5>
                            <h6>{host.available}</h6>
                        </div>
                        <div className="wl-hostItem-line">
                            <h5 className="t5">Speaks :</h5>
                            <h6> {host.languages}</h6>
                        </div>
                        <div className="wl-hostItem-line">
                            <h5 className="t5"> Nombres of Rooms:</h5>
                            <h6>{host.nbreOfRooms} </h6>
                        </div>
                        <div className="wl-hostItem-line">
                            <h5 className="t5"> Nombres of Beds:</h5>
                            <h6>{host.nbreOfBeds} </h6>
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
                </div>
                <div className="wl-hostDestinationItem-buttons">
                    {id === host.host ? null : (
                        <div>
                            <ColorButton
                                variant="contained"
                                color="primary"
                                className={classes.margin}
                            >
                                Message
                            </ColorButton>
                            {host.isReported === 1 ? (
                                <ColorButtonDelete
                                    variant="contained"
                                    color="primary"
                                    disabled
                                    className={classes.margin}
                                    onClick={handleReport}
                                >
                                    Report
                                </ColorButtonDelete>
                            ) : (
                                <ColorButtonDelete
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    onClick={handleReport}
                                >
                                    Report
                                </ColorButtonDelete>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </React.Fragment>
    );
}

export default HostDestinationItem;
