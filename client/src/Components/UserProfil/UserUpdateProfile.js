import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { userId, getToken } from "../../utils";
import "./UserEditProfile.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../redux/actions/userActions";

function    UserUpdateProfile({ match }) {
    // eslint-disable-next-line
    const history = useHistory();
    // const dispatch = useDispatch();
    // const UserInfos = useSelector((state) => state.ContactsReducer.userInfos);
    let id = userId();
    let token = getToken();
    const [updateInfos, setupdateInfos] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
    }, [id, token, dispatch]);

    const userInfos = useSelector((state) => state.userReducer.user);

    const handelUpdateInfos = (e) => {
        setupdateInfos({ ...updateInfos, [e.target.name]: e.target.value });
    };
    const handelClick = () => {
        axios
            .put(`/api/profile/updateUserInfos/${id}`, updateInfos, {
                headers: {
                    jwt: token,
                },
            })
            .then((response) => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    confirmButtonText: "CONTINUE",
                });
                history.push(`/profile/${id}`);
            })
            .catch((error) => console.dir(error));
    };

    return (
        // eslint-disable-next-line
        <div>
            <NavBar />
            <h1>Update your Personal Informations</h1>
            <form className="form-style-7" onChange={handelUpdateInfos}>
                <ul>
                    <li>
                        <label>Gender</label>
                        <input
                            type="text"
                            name="Gender"
                            maxLength="100"
                            defaultValue={userInfos.Gender}
                        />
                    </li>
                    <li>
                        <label>Country</label>
                        <input
                            type="text"
                            name="Country"
                            maxLength="100"
                            defaultValue={userInfos.Country}
                        />
                    </li>
                    <li>
                        <label>PhoneNumber</label>
                        <input
                            type="number"
                            name="PhoneNumber"
                            maxLength="100"
                            defaultValue={userInfos.PhoneNumber}
                        />
                    </li>
                    <li>
                        <label>Languages</label>
                        <input
                            type="text"
                            name="Languages"
                            maxLength="100"
                            defaultValue={userInfos.Languages}
                        />
                    </li>
                    <li>
                        <label>Education</label>
                        <input
                            type="text"
                            name="Education"
                            maxLength="100"
                            defaultValue={userInfos.Education}
                        />
                    </li>
                    <li>
                        <label>Occupation</label>
                        <input
                            type="text"
                            name="Occupation"
                            maxLength="100"
                            defaultValue={userInfos.Occupation}
                        />
                    </li>
                    <li>
                        <label>Hobbies</label>
                        <input
                            type="text"
                            name="Hobbies"
                            maxLength="100"
                            defaultValue={userInfos.Hobbies}
                        />
                    </li>
                    <li>
                        <label>Visited Country</label>
                        <input
                            type="text"
                            name="CountriesIvisited"
                            maxLength="100"
                            defaultValue={userInfos.CountriesIvisited}
                        />
                    </li>

                    <li>
                        <label>About Me</label>
                        <textarea
                            type="text"
                            name="AboutMe"
                            defaultValue={userInfos.AboutMe}
                        ></textarea>
                    </li>
                    <li>
                        <input
                            type="button"
                            value="Update"
                            onClick={handelClick}
                        />
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default UserUpdateProfile;
