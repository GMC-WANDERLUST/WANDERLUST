import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { grey, red, blue, blueGrey } from "@material-ui/core/colors";
import { VscComment } from "react-icons/vsc";
import { AiOutlineLike } from "react-icons/ai";
import "../UserProfil/PostItem.css";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    margin: {
        margin: theme.spacing(0),
        width: "100%",
        fontSize: "0.7em",
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    // margin: {
    //     margin: theme.spacing(1),
    // },
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
                        <h6>
                            {dateTab[0]} at {dateTab[1].split(".")[0]}
                        </h6>
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
                            <div className="wl-postItem-row">
                                <div className="wl-postItem-line">
                                    <h5 className="t5">Destination :</h5>
                                    <h6>{post.destination.toUpperCase()}</h6>
                                </div>
                                <div className="wl-postItem-first-line">
                                    <h5 className="t5"> City :</h5>
                                    <h6>{post.city.toUpperCase()}</h6>
                                </div>
                            </div>
                            <div className="wl-postItem-row">
                                <div className="wl-postItem-line">
                                    <h5 className="t5">From :</h5>
                                    <h6>{post.check_in}</h6>
                                </div>
                                <div className="wl-postItem-first-line">
                                    <h5 className="t5">To :</h5>
                                    <h6>{post.check_out}</h6>
                                </div>
                            </div>
                            <div className="wl-postItem-line">
                                <h5 className="t5">Speaks :</h5>
                                <h6> {post.languages}</h6>
                            </div>
                            <div className="wl-postItem-line">
                                <h5 className="t5"> Nombres of Guests:</h5>
                                <h6>{post.nbreOfGuests[0]} </h6>
                            </div>
                            <div className="wl-postItem-line">
                                <h5 className="t5">Decsription :</h5>
                                <h6>" {post.description} "</h6>
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

export default PostItem;
