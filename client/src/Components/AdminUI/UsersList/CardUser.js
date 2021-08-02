import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
    makeStyles,
    withStyles,
    ThemeProvider,
    createTheme,
} from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ReplayIcon from "@material-ui/icons/Replay";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { red } from "@material-ui/core/colors";
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
const theme = createTheme({
    palette: {
        primary: {
            main: "#9b0000",
        },
        secondary: {
            main: "#43a047",
        },
        info: {
            main: "#1e88e5",
        },
        warning: {
            main: "#e0e0e0",
        },
    },
});
// const theme2 = createTheme({
//     palette: {
//         primary: {
//             main: "#1e88e5",
//         },
//         secondary: {
//             main: "#e0e0e0",
//         },
//     },
// });
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
                                    <ThemeProvider theme={theme}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color={
                                                user.isUser
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                            className={classes.button}
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
                                            color={
                                                user.isAdmin
                                                    ? "info"
                                                    : "warning"
                                            }
                                            className={classes.button}
                                            startIcon={
                                                user.isAdmin ? (
                                                    <HighlightOffIcon />
                                                ) : (
                                                    <AddCircleIcon />
                                                )
                                            }
                                            onClick={handelAddAdmin}
                                        >
                                            {user.isAdmin ? "Remove" : "Add"}
                                        </Button>
                                    </ThemeProvider>
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
