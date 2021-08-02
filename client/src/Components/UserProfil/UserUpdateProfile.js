import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../redux/actions/userActions";
////////////////////////////////////////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                WANDERLUST
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    // buttons: {
    //     margin: theme.spacing(1),
    // },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function UserUpdateProfile() {
    const classes = useStyles();

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
    const test = useSelector((state) => state.userReducer.test);
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
                    showLoaderOnConfirm: true,
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
            {test ? (
                <React.Fragment>
                    <CssBaseline />
                    <AppBar
                        position="absolute"
                        color="default"
                        className={classes.appBar}
                    >
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                WANDERLUST
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.layout}>
                        <Paper
                            className={classes.paper}
                            onChange={handelUpdateInfos}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                align="center"
                            ></Typography>
                            <React.Fragment>
                                <Grid container spacing={3}>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            defaultValue={userInfos.Country}
                                            required
                                            id="Country"
                                            name="Country"
                                            label="Country"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            defaultValue={userInfos.PhoneNumber}
                                            required
                                            id="PhoneNumber"
                                            name="PhoneNumber"
                                            label="Phone Number"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <InputLabel id="demo-simple-select-label">
                                                Gender
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                required
                                                name="Gender"
                                                defaultValue={userInfos.Gender}
                                            >
                                                <MenuItem
                                                    value="Male"
                                                    name="Gender"
                                                >
                                                    Male
                                                </MenuItem>
                                                <MenuItem
                                                    value="Female"
                                                    name="Gender"
                                                >
                                                    Female
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            defaultValue={userInfos.Languages}
                                            required
                                            id="Languages"
                                            name="Languages"
                                            label="Languages"
                                            fullWidth
                                            autoComplete="Languages"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            defaultValue={userInfos.Education}
                                            id="Education"
                                            name="Education"
                                            label="Education"
                                            fullWidth
                                            autoComplete="Education"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            defaultValue={userInfos.Occupation}
                                            id="Occupation"
                                            name="Occupation"
                                            label="Occupation"
                                            fullWidth
                                            autoComplete="Occupation"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userInfos.Hobbies}
                                            id="Hobbies"
                                            name="Hobbies"
                                            label="Hobbies"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            defaultValue={
                                                userInfos.CountriesIvisited
                                            }
                                            id="CountriesIvisited"
                                            name="CountriesIvisited"
                                            label="Visited Countries"
                                            fullWidth
                                            autoComplete="CountriesIvisited"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userInfos.AboutMe}
                                            id="AboutMe"
                                            label="About me"
                                            name="AboutMe"
                                            multiline
                                            maxRows={5}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    onClick={handelClick}
                                >
                                    Update
                                </Button>
                            </React.Fragment>
                        </Paper>
                        <Copyright />
                    </main>
                </React.Fragment>
            ) : (
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            )}

            {/* <form className="form-style-7" onChange={handelUpdateInfos}>
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
                            // onClick={handelClick}
                        />
                    </li>
                </ul>
            </form> */}
        </div>
    );
}

export default UserUpdateProfile;
