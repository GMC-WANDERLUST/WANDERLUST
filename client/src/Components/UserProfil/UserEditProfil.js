import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { userId, getToken } from "../../utils";
import "./UserEditProfile.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserInfos } from "../../redux/actions/userActions";

function UserEditProfil({ match }) {
    // eslint-disable-next-line
    const history = useHistory();
    // const dispatch = useDispatch();
    // const UserInfos = useSelector((state) => state.ContactsReducer.userInfos);
    let id = userId();
    let token = getToken();
    const [userInfos, setUserInfos] = useState({});
    const handelAddInfos = (e) => {
        setUserInfos({ ...userInfos, [e.target.name]: e.target.value });
    };
    const handelClick = () => {
        axios
            .post(`/api/profile/addUserInfos/${id}`, userInfos, {
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
                history.push(`/addprofilephoto/${id}`);
            })
            .catch((error) => console.dir(error));
    };
    // useEffect(() => {
    //     dispatch(getUserInfos({ id }));
    //     // eslint-disable-next-line
    // }, []);

    return (
        // eslint-disable-next-line
        <div>
            <NavBar />
            <h1>Please add your Personal Informations</h1>
            <form className="form-style-7" onChange={handelAddInfos}>
                <ul>
                    <li>
                        <label>Gender</label>
                        <input type="text" name="Gender" maxLength="100" />
                    </li>
                    <li>
                        <label>Country</label>
                        <input type="text" name="Country" maxLength="100" />
                    </li>
                    <li>
                        <label>PhoneNumber</label>
                        <input
                            type="number"
                            name="PhoneNumber"
                            maxLength="100"
                        />
                    </li>
                    <li>
                        <label>Languages</label>
                        <input type="text" name="Languages" maxLength="100" />
                    </li>
                    <li>
                        <label>Education</label>
                        <input type="text" name="Education" maxLength="100" />
                    </li>
                    <li>
                        <label>Occupation</label>
                        <input type="text" name="Occupation" maxLength="100" />
                    </li>
                    <li>
                        <label>Hobbies</label>
                        <input type="text" name="Hobbies" maxLength="100" />
                    </li>
                    <li>
                        <label>Visited Country</label>
                        <input
                            type="text"
                            name="CountriesIvisited"
                            maxLength="100"
                        />
                    </li>
            
                    <li>
                        <label>About Me</label>
                        <textarea name="text" name="AboutMe"></textarea>
                    </li>
                    <li>
                        <input
                            type="button"
                            value="Send This"
                            onClick={handelClick}
                        />
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default UserEditProfil;
