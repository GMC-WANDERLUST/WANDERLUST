import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBarExt from "../NavBar/NavBarExt";
import Swal from "sweetalert2";
// import { createUser } from "../../redux/actions/userActions";
// import { useDispatch } from "react-redux";
// import { userId } from "../../utils";

function Register() {
    let d = new Date();
    let currentYear = d.getFullYear();
    const history = useHistory();
    // const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({});
    // const [newUserId, setnewUserId] = useState();
    const handelChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        axios
            .post("/api/user/register", newUser)
            .then((response) => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    text: "The journey starts now!",
                    confirmButtonText: "GO NOW",
                });
                history.push("/login");
            })
            .catch((error) =>
                Swal.fire({ title: error.response.data.message, icon: "error" })
            );
        // setnewUserId(userId());
        // dispatch(createUser({ newUserId,  }));
    };
    const handleAlert = () => {
        Swal.showLoading(Swal.getDenyButton());
    };

    return (
        <div>
            <NavBarExt />
            {/* <AlertDismissible msgError={msgError} /> */}
            <form className="register-container">
                <label>First name:</label>
                <input type="text" name="FirstName" onChange={handelChange} />
                <br />
                <label>Last name:</label>
                <input type="text" name="LastName" onChange={handelChange} />
                <br />
                <input
                    type="number"
                    name="DayOfBirth"
                    min="1"
                    max="31"
                    placeholder="Day"
                    onChange={handelChange}
                />
                <select name="MonthOfBirth" onChange={handelChange}>
                    <option name="MonthOfBirth">Month</option>
                    <option value="January" name="MonthOfBirth">
                        January
                    </option>
                    <option value="February" name="MonthOfBirth">
                        February
                    </option>
                    <option value="March" name="MonthOfBirth">
                        March
                    </option>
                    <option value="April" name="MonthOfBirth">
                        April
                    </option>
                    <option value="Mai" name="MonthOfBirth">
                        Mai
                    </option>
                    <option value="June" name="MonthOfBirth">
                        June
                    </option>
                    <option value="July" name="MonthOfBirth">
                        July
                    </option>
                    <option value="August" name="MonthOfBirth">
                        August
                    </option>
                    <option value="September" name="MonthOfBirth">
                        September
                    </option>
                    <option value="October" name="MonthOfBirth">
                        October
                    </option>
                    <option value="November" name="MonthOfBirth">
                        November
                    </option>
                    <option value="December" name="MonthOfBirth">
                        December
                    </option>
                </select>
                <input
                    type="text"
                    name="YearOfBirth"
                    min="1950"
                    max={currentYear}
                    placeholder="Year"
                    onChange={handelChange}
                />
                <label>E-mail:</label>
                <input type="email" name="email" onChange={handelChange} />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    autoComplete="password"
                    onChange={handelChange}
                />
                <br />
                <label>Confirm:</label>
                <input
                    type="password"
                    name="repeat_password"
                    autoComplete="repeat_password"
                    onChange={handelChange}
                />
                <br />

                <button type="button" onClick={handleRegister}>
                    Register
                </button>
                <button type="button" onClick={handleAlert}>
                    Alert
                </button>
            </form>
        </div>
    );
}

export default Register;
