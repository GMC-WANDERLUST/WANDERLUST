import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button } from "react-bootstrap";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import "./CardUser.css";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "36ch",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));
function CardUser({ token, user, id }) {
    const classes = useStyles();
    const handelBanUser = () => {
        if (user.isUser) {
            axios
                .put(
                    `/api/admin/bannedUser/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => console.dir(error));
        } else {
            axios
                .put(
                    `/api/admin/unbanedUser/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => console.dir(error));
        }
    };
    const handelAddAdmin = () => {
        if (user.isAdmin) {
            axios
                .put(
                    `/api/admin/removeAdmin/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .put(
                    `/api/admin/addAdmin/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.lcation.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const saveUserId = () => {
        sessionStorage.setItem("randomId", user._id);
    };

    return (
        <div className="wl-card-item">
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={user.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Link
                                to={`/uprofile/${user._id}`}
                                onClick={saveUserId}
                            >
                                <h5>
                                    {user.FirstName.toUpperCase()} <br />{" "}
                                    {user.LastName.toUpperCase()}{" "}
                                </h5>
                            </Link>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    <Button
                                        variant={
                                            user.isUser ? "danger" : "warning"
                                        }
                                        onClick={handelBanUser}
                                    >
                                        {user.isUser ? "Ban" : "Unban"}
                                    </Button>
                                    <Button
                                        variant={
                                            user.isAdmin
                                                ? "outline-secondary"
                                                : "outline-primary"
                                        }
                                        onClick={handelAddAdmin}
                                    >
                                        {user.isAdmin ? "Remove" : "Add"}
                                    </Button>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        </div>
    );
}

export default CardUser;
