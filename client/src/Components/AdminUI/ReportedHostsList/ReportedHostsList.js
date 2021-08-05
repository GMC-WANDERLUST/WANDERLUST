import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userId, getToken } from "../../../utils";
import { adminGetReportedHosts } from "../../../redux/actions/adminActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import "./UsersList.css";
import CardHost from "../HostsList/CardHost";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "none",
        display: "flex",
        flexWrap: "wrap",
        marginLeft:"350px"    },
    inline: {
        display: "inline",
    },
}));

function ReportedUsersList() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(adminGetReportedHosts({ id, token }));
    }, [id, token, dispatch]);
    const reportedHosts = useSelector(
        (state) => state.adminReducer.adminReportedHosts
    );
    return (
        <div className="wl-admin-userList bckg">
            <h1>Reported Hosts List</h1>
            <List className={classes.root}>
                {reportedHosts
                    .map((host) => (
                        <div key={host._id}>
                            <CardHost token={token} host={host} id={id} />
                        </div>
                    ))
                    .reverse()}
            </List>
            <Button href={`/adminUi/${id}`} color="primary" variant="contained" size="large">
                Back
            </Button>
        </div>
    );
}

export default ReportedUsersList;
