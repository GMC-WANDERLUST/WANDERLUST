import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, yellow } from "@material-ui/core/colors";
import "../UserProfil/PostItem.css";

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
    const [editPost, setEditPost] = useState({});
    var n = Date.now();

    let dateTab = post.date.split("T");
    return (
        <React.Fragment>
            <section className="wl-postItem-container">
                <div className="wl-postItem-box">
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
                                <p>{post.check_in}</p>
                            </div>
                            <div className="wl-postItem-line">
                                <h6 className="t5">To :</h6>
                                <p>{post.check_out}</p>
                            </div>

                            <div className="wl-postItem-line">
                                <h6 className="t5">Speaks :</h6>
                                <p> {post.languages}</p>
                            </div>
                            <div className="wl-postItem-line">
                                <h6 className="t5"> Nombres of Guests:</h6>
                                <p>{post.nbreOfGuests[0]} </p>
                            </div>
                            <div className="wl-postItem-line">
                                <h6 className="t5">Decsription :</h6>
                                <p>" {post.description} "</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default PostItem;
