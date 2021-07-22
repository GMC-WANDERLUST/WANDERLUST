import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../redux/actions/userActions";
import { userId, getToken } from "../../utils";

function UserProfile() {
    let id = userId();
    let token = getToken();
    console.log(token);
    // const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
    }, []);
    return (
        <React.Fragment>
            <NavBar />
            <h1>This is the user Profile</h1>
        </React.Fragment>
    );
}

export default UserProfile;
