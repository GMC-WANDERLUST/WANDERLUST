import React, { useEffect } from "react";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsersPosts } from "../../../redux/actions/adminActions";
import CardPost from "./CardPost";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import "./UsersPost.css"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        maxWidth: "80%",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexWrap: "wrap",
    },
    inline: {
        display: "inline",
    },
}));

function UserPostsList() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(adminGetUsersPosts({ id, token }));
    }, [id, token, dispatch]);
    const postsList = useSelector((state) => state.adminReducer.adminPostsList);
    return (
      <div className="wl-admin-postsList">
        <h1>Travellers Posts List</h1>
        <List className={classes.root}>
          {postsList
            .map((post) => (
              <div key={post._id}>
                <CardPost post={post} />
              </div>
            ))
            .reverse()}
        </List>
        <Button
          href={`/adminUi/${id}`}
          color="primary"
          variant="contained"
          size="large"
        >
          Back
        </Button>
      </div>
    );
}

export default UserPostsList;
