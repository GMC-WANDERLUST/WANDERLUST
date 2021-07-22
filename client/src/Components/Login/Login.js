import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { login, saveId } from "../../utils/";
import NavBarExt from "../NavBar/NavBarExt";
import Swal from "sweetalert2";

function Login() {
    const [user, setUser] = useState({});
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const history = useHistory();
    // const id = userId();
    const handleLogin = () => {
        axios
            .post("/api/user/login", user)
            .then((response) => {
                saveId(response.data.id);
                login(response.data.token);
                Swal.fire({
                    title: response.data.message.toUpperCase(),
                    icon: "success",
                    confirmButtonText: "Let's Go!",
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    },
                });
                history.push(`/editProfile/${response.data.id}`);
            })
            .catch((error) =>
                Swal.fire({ title: error.response.data.message, icon: "error" })
            );
        //
    };
    return (
        <div>
            <NavBarExt />
            <div className="login-container">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            autoComplete="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
