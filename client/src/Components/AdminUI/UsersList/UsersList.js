import React, { useEffect } from "react";
import UserCard from "./Rescue/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { userId, getToken } from "../../../utils";
import { getAllUsers } from "../../../redux/actions/adminActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import CardUser from "./CardUser";

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
    <div>
      {console.log(usersList)}
      <List className={classes.root}>
        <h1>Users List</h1>
        {usersList.map((user) => (
          <div key={user._id}>
            <CardUser token={token} user={user} id={id} />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UsersList;
