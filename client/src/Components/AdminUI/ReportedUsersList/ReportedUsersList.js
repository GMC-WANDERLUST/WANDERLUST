import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userId, getToken } from "../../../utils";
import { adminGetReportedHosts } from "../../../redux/actions/adminActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ReportedUserCard from "./ReportedUserCard";
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

function ReportedUsersList() {
  const classes = useStyles();
  let id = userId();
  let token = getToken();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGetReportedHosts({ id, token }));
  }, [id, token, dispatch]);
  const adminReportedHosts = useSelector(
    (state) => state.adminReducer.adminReportedHosts
  );
  return (
    <div className="wl-admin-userList">
      <h1>Reported Hosts List</h1>
      <List className={classes.root}>
        {adminReportedHosts
          .map((user) => (
            <div key={user._id}>
              <ReportedUserCard token={token} user={user} id={id} />
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

export default ReportedUsersList;
