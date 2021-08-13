import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import "./CardPost.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        maxWidth: 400,
        backgroundColor: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    item: {
        // boxShadow: "2px 2px 2px black",
        height: "100%",
    },
    titre: {
        fontWeight: "bold",
    },
    inline: {
        display: "inline",
    },
}));
const defaultProps = {
    bgcolor: "background.paper",
    m: 1,
    margin: "10px",
    style: { width: "18rem", height: "25rem" },
    borderColor: "none",
    boxShadow:
        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
};
function CardPost({ token, post, id }) {
    const classes = useStyles();
    const handleDelete = () => {
        axios
            .delete(`/api/admin/deletePost/${id}`, {
                headers: {
                    jwt: token,
                    data: post._id,
                },
            })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => console.dir(error));
    };
    const saveUserId = () => {
        sessionStorage.setItem("randomId", post.user);
    };

    return (
        <div className="wl-postCard">
            <Box display="flex" justifyContent="center">
                <Box border={0} {...defaultProps}>
                    <List className={classes.root}>
                        <ListItem
                            alignItems="flex-start"
                            className={classes.item}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={post.img} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link
                                        to={`/uprofile/${post.user}`}
                                        onClick={saveUserId}
                                    >
                                        <h6>
                                            {post.firstName.toUpperCase()}{" "}
                                            <br />
                                            {post.lastName.toUpperCase()}
                                        </h6>
                                    </Link>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            // variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            <span className={classes.titre}>
                                                Destination :
                                            </span>
                                            {post.destination.toUpperCase()}{" "}
                                            <br />
                                            <span className={classes.titre}>
                                                City :
                                            </span>{" "}
                                            {post.city.toUpperCase()}
                                            <br />
                                            <span className={classes.titre}>
                                                From :
                                            </span>
                                            {post.check_in} <br />
                                            <span className={classes.titre}>
                                                To :
                                            </span>{" "}
                                            {post.check_out} <br />
                                            <span className={classes.titre}>
                                                Number of Guests :
                                            </span>{" "}
                                            {post.nbreOfGuests} <br />
                                            <span className={classes.titre}>
                                                Description :
                                            </span>
                                            {post.description}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <div>
                            <Button
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                variant="contained"
                                color="secondary"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </List>
                </Box>
            </Box>
        </div>
    );
}

export default CardPost;
