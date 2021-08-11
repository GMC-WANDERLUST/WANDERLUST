import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { login, saveId, saveIsHost, saveIsAdmin } from "../../utils";
import { red } from "@material-ui/core/colors";
import NavBarExt from "../NavBar/NavBarExt";
import Swal from "sweetalert2";
import "./Login.css";
import backgroundImg from "./backgroundImg.png";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        // backgroundColor:
        //     theme.palette.type === "light"
        //         ? theme.palette.grey[50]
        //         : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    // image: {
    //     backgroundImage: `url(${backgroundImg})`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor:
    //         theme.palette.type === "light"
    //             ? theme.palette.grey[50]
    //             : theme.palette.grey[900],
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    // },
    paper: {
        margin: theme.spacing(0, 0),
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.6) ",
        padding: "25px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LogInSide() {
    const classes = useStyles();
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
                saveIsHost(response.data.isHost);
                saveIsAdmin(response.data.isAdmin);
                {
                    response.data.check
                        ? Swal.fire({
                              title: response.data.message.toUpperCase(),
                              icon: "success",
                              confirmButtonText: "Let's Go!",
                              showLoaderOnConfirm: true,
                          })
                        : Swal.fire({
                              title: response.data.msg,
                              icon: "success",
                              confirmButtonText: "Let's Go!",
                              showLoaderOnConfirm: true,
                          });
                }

                {
                    response.data.check
                        ? history.push(`/profile/${response.data.id}`)
                        : history.push(`/editProfile/${response.data.id}`);
                }
            })
            .catch((error) =>
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                })
            );
        //
    };

    return (
        <Grid container component="main" className={classes.root}>
            {/* <CssBaseline /> */}
            <Grid item xs={false} sm={4} md={7} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                // component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            size="medium"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            id="email"
                            // autoFocus
                            // autoComplete="email"
                            onChange={handleChange}
                        />
                        <TextField
                            size="medium"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoFocus
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}
export default LogInSide;
