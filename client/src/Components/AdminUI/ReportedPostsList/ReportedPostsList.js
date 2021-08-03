import React, { useEffect } from "react";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetReportedPosts } from "../../../redux/actions/adminActions";
import ReportedPostCard from "./ReportedPostCard";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import "./UsersPost.css";

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

function ReportedPostsList() {
  const classes = useStyles();
  let id = userId();
  let token = getToken();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGetReportedPosts({ id, token }));
  }, [id, token, dispatch]);
  const adminReportedPosts = useSelector(
    (state) => state.adminReducer.adminReportedPosts
  );
  return (
    <div className="wl-admin-postsList">
      <h1>Reported Posts List</h1>
      <List className={classes.root}>
        {adminReportedPosts
          .map((post) => (
            <div key={post._id}>
              <ReportedPostCard post={post} />
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

export default ReportedPostsList;
