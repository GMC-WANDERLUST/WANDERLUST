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
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import "./CardPost.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    item: {
        boxShadow: "2px 2px 2px black",
    },
    titre: {
        fontWeight: "bold",
    },
    inline: {
        display: "inline",
    },
}));
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
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={post.img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Link
                                to={`/uprofile/${post.user}`}
                                onClick={saveUserId}
                            >
                                <h5>
                                    {post.firstName.toUpperCase()} <br />
                                    {post.lastName.toUpperCase()}
                                </h5>
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
                                    {post.destination.toUpperCase()} <br />
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
                                        Nombre of Guests :
                                    </span>{" "}
                                    {post.nbreOfGuests} <br />
                                </Typography>
                                {post.description}
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
                <Divider variant="inset" component="li" />
            </List>
        </div>
    );
}

export default CardPost;
