import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userId, getToken } from "../../../utils";
import { getAllUsers } from "../../../redux/actions/adminActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import CardUser from "./CardUser";
import "./UsersList.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexWrap: "wrap",
    },
    inline: {
        display: "inline",
    },
}));

function UsersList() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers({ id, token }));
    }, [id, token, dispatch]);
    const usersList = useSelector((state) => state.adminReducer.usersList);
    return (
        <div className="wl-admin-userList">
            <h1>Users List</h1>
            <List className={classes.root}>
                {usersList
                    .map((user) => (
                        <div key={user._id}>
                            <CardUser token={token} user={user} id={id} />
                        </div>
                    ))
                    .reverse()}
            </List>
            <Button href={`/adminUi/${id}`} color="primary">
                Back
            </Button>
        </div>
    );
}

export default UsersList;
