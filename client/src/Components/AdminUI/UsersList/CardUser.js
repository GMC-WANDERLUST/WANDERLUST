import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
    makeStyles,
    withStyles,
    createTheme,
    ThemeProvider,
} from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ReplayIcon from "@material-ui/icons/Replay";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import "./CardUser.css";
import { Link } from "react-router-dom";
import {
    blue,
    amber,
    deepOrange,
    red,
    pink,
    green,
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "36ch",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
    ban: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        "&:hover": {
            backgroundColor: red[900],
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: red[700],
            },
        },
    },
    unban: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        "&:hover": {
            backgroundColor: green[900],
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: green[700],
            },
        },
    },
    addAdmin: {
        color: theme.palette.getContrastText(blue[700]),
        backgroundColor: blue[700],
        "&:hover": {
            backgroundColor: blue[900],
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: blue[700],
            },
        },
    },
    remove: {
        color: theme.palette.getContrastText(amber[700]),
        backgroundColor: amber[700],
        "&:hover": {
            backgroundColor: amber[900],
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: amber[700],
            },
        },
    },
}));
const defaultProps = {
    bgcolor: "background.paper",
    m: 1,
    margin: "10px",
    style: { width: "20rem", height: "10rem" },
    borderColor: "none",
    boxShadow:
        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
};

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
                    window.location.reload();
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
        <div className="wl-user-card-item">
            <Box display="flex" justifyContent="center">
                <Box border={0} {...defaultProps}>
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
                                        <h6>
                                            {user.FirstName.toUpperCase()}{" "}
                                            <br /> {user.LastName.toUpperCase()}{" "}
                                        </h6>
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
                                                size="small"
                                                variant="contained"
                                                // color={
                                                //     user.isUser
                                                //         ? "secondary"
                                                //         : "primary"
                                                // }
                                                className={
                                                    user.isUser
                                                        ? classes.ban
                                                        : classes.unban
                                                }
                                                startIcon={
                                                    user.isUser ? (
                                                        <RemoveCircleIcon />
                                                    ) : (
                                                        <ReplayIcon />
                                                    )
                                                }
                                                onClick={handelBanUser}
                                            >
                                                {user.isUser ? "Ban" : "Unban"}
                                            </Button>

                                            <Button
                                                size="small"
                                                variant="contained"
                                                // color={
                                                //     user.isAdmin
                                                //         ? "secondary"
                                                //         : "primary"
                                                // }
                                                className={
                                                    user.isAdmin
                                                        ? classes.remove
                                                        : classes.addAdmin
                                                }
                                                startIcon={
                                                    user.isAdmin ? (
                                                        <HighlightOffIcon />
                                                    ) : (
                                                        <AddCircleIcon />
                                                    )
                                                }
                                                onClick={handelAddAdmin}
                                            >
                                                {user.isAdmin
                                                    ? "Remove"
                                                    : "Add"}
                                            </Button>
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </div>
    );
}

export default CardUser;
