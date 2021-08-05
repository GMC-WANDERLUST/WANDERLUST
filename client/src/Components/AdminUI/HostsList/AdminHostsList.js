import React, { useEffect } from "react";
import CardHost from "./CardHost";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetHosts } from "../../../redux/actions/adminActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import "./AdminHostsList.css"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        maxWidth: "70%",
        backgroundColor: "none",
        display: "flex",
        flexWrap: "wrap",
    },
    inline: {
        display: "inline",
    },
}));

function AdminHostsList() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(adminGetHosts({ id, token }));
    }, [id, token, dispatch]);
    const hostsList = useSelector((state) => state.adminReducer.adminHostsList);
    return (
      <div className="wl-admin-hostsList">
        <h1>Hosts Posts List</h1>
        <List className={classes.root}>
          {hostsList.map((host) => (
            <div key={host._id}>
              <CardHost host={host} />
            </div>
          ))}
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

export default AdminHostsList;
