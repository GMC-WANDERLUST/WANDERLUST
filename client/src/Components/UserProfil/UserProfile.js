import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../redux/actions/userActions";
import { userId, getToken } from "../../utils";
import ModalEditFirstName from "./ModalEditFirstName";
import ModalEditLastName from "./ModalEditLastName";
import ModalEditPhoto from "./ModalEditPhoto";

function UserProfile() {
    let id = userId();
    let token = getToken();
    // const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
    }, [id, token, dispatch]);
    const user = useSelector((state) => state.userReducer.user);
    console.log("user", user);
    return (
        <React.Fragment>
            <NavBar />
            <h1>This is the user Profile</h1>
            <div key={user._id}>
                <img src={user.photo} alt="profile_photo" width="250px" />
                <ModalEditPhoto action="Edit you photo" data={user.photo} />
                <h1>{user.FirstName}</h1>
                <ModalEditFirstName
                    action={"Edit First Name"}
                    data={user.FirstName}
                />
                <h1>{user.LastName}</h1>
                <ModalEditLastName
                    action={"Edit Last Name"}
                    data={user.LastName}
                />
                <h2>{user.Country}</h2>
                <h3>
                    {user.DayOfBirth} {user.MonthOfBirth} {user.YearOfBirth}
                </h3>
            </div>
            {/* {user.map((info) => (
               
            ))} */}
        </React.Fragment>
    );
}

export default UserProfile;
