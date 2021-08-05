import React, { useEffect } from "react";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetReportedPosts } from "../../../redux/actions/adminActions";
import CardPost from "../PostsList/CardPost"
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
    marginLeft:"250px"
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
  const reportedPosts = useSelector(
    (state) => state.adminReducer.adminReportedPosts
  );
  return (
    <div className="wl-admin-postsList">
      <h1>Reported Travellers List</h1>
      <List className={classes.root}>
        {reportedPosts
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

export default ReportedPostsList;
