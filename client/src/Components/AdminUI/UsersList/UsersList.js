import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { userId, getToken } from "../../../utils";
import { getAllUsers } from "../../../redux/actions/adminActions";

function UsersList() {
  let id = userId();
  let token = getToken();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers({ id, token }));
  }, [id, token, dispatch]);
  const usersList = useSelector((state) => state.adminReducer.usersList);
  return (
    <div>
      <h1>this is userList</h1>
      {usersList.map((user) => (
        <div key={user._id}>
          <UserCard user={user}/>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
