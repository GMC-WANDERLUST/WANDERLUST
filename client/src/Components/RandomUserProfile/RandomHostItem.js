import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { grey, red, blue, blueGrey, yellow } from "@material-ui/core/colors";
import { VscComment } from "react-icons/vsc";
import { AiOutlineLike } from "react-icons/ai";
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
const ColorButtonLike = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText("#ffffff"),
        backgroundColor: "#ffffff",
        "&:hover": {
            backgroundColor: blue["A700"],
            color: "white",
        },
    },
}))(Button);
const ColorButtonComment = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText("#ffffff"),
        backgroundColor: "#ffffff",
        "&:hover": {
            backgroundColor: blueGrey[600],
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
        margin: theme.spacing(0),
        width: "100%",
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
    var n = Date.now();
    let dateTab = host.date.split("T");
    return (
        <React.Fragment>
            <section className="wl-hostItem-container">
                <div className="wl-hostItem-box">
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
                            <h5>
                                {host.firstName} {host.lastName}
                            </h5>
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
                                <h5 className="t5">Speaks :</h5>
                                <h6> {host.languages}</h6>
                            </div>
                            <div className="wl-hostItem-row">
                                <div className="wl-hostItem-line">
                                    <h5 className="t5"> Nombres of Rooms:</h5>
                                    <h6>{host.nbreOfRooms} </h6>
                                </div>
                                <div className="wl-hostItem-first-line">
                                    <h5 className="t5"> Nombres of Beds:</h5>
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
                        <div className="wl-postItem-buttons">
                            <ColorButtonLike
                                variant="contained"
                                color="primary"
                                className={classes.margin}
                                startIcon={<AiOutlineLike />}
                            >
                                Like
                            </ColorButtonLike>
                            <ColorButtonComment
                                variant="contained"
                                color="primary"
                                className={classes.margin}
                                startIcon={<VscComment />}
                            >
                                Comment
                            </ColorButtonComment>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default HostItem;
