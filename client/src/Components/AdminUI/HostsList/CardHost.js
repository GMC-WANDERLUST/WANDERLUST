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
import { Link } from "react-router-dom";
import "./CardHost.css"
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
    },
    titre: {
        fontWeight: "bold",
    },
    inline: {
        display: "inline",
    },
}));
function CardPost({ token, host, id }) {
    const classes = useStyles();
    const handleDelete = () => {
        axios
            .delete(`/api/admin/deleteHost/${id}`, {
                headers: {
                    jwt: token,
                    data: host._id,
                },
            })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => console.dir(error));
    };
    const saveUserId = () => {
        sessionStorage.setItem("randomId", host.host);
    };
    return (
        <div className="wl-card-item">
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="host photo" src={host.img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Link
                                to={`/uprofile/${host.host}`}
                                onClick={saveUserId}
                            >
                                <h4>
                                    {host.firstName.toUpperCase()} <br />
                                    {host.lastName.toUpperCase()}
                                </h4>
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
                                        Residence :
                                    </span>
                                    {host.residence.toUpperCase()}
                                    <br />
                                    <span className={classes.titre}>
                                        City :
                                    </span>
                                    {host.city.toUpperCase()}
                                    <br />
                                    <span className={classes.titre}>
                                        Nombre of Rooms:
                                    </span>{" "}
                                    {host.nbreOfRooms}
                                    <br />
                                    <span className={classes.titre}>
                                        Nombre of Beds :
                                    </span>{" "}
                                    {host.nbreOfBeds}
                                    <br />
                                    <span className={classes.titre}>
                                        Price :
                                    </span>{" "}
                                    {host.price} $
                                    <br />
                                </Typography>
                                {host.description}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Delete
                </Button>
                <Divider variant="inset" component="li" />
            </List>
        </div>
    );
}

export default CardPost;
