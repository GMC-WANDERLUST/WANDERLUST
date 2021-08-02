import React, { useState } from "react";
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
import axios from "axios";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

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
export default function Checkout() {
    const classes = useStyles();
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
                    showLoaderOnConfirm: true,
                });
                history.push(`/addprofilephoto/${id}`);
            })
            .catch((error) => {
                console.dir(error);
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                    confirmButtonText: "OK",
                    showLoaderOnConfirm: true,
                });
            });
    };
    return (
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
                <Paper className={classes.paper} onChange={handelAddInfos}>
                    <Typography component="h1" variant="h4" align="center">
                        Please enter you informations
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={3}>
                            <Grid item xs={4} sm={4}>
                                <TextField
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
                                    required
                                    id="PhoneNumber"
                                    name="PhoneNumber"
                                    label="Phone Number"
                                    fullWidth
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">
                                        Gender
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        name="Gender"
                                        // onChange={handelChange}
                                    >
                                        <MenuItem value="Male" name="Gender">
                                            Male
                                        </MenuItem>
                                        <MenuItem value="Female" name="Gender">
                                            Female
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="Languages"
                                    name="Languages"
                                    label="Languages"
                                    fullWidth
                                    // autoComplete="Languages"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="Education"
                                    name="Education"
                                    label="Education"
                                    fullWidth
                                    // autoComplete="Education"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="Occupation"
                                    name="Occupation"
                                    label="Occupation"
                                    fullWidth
                                    // autoComplete="Occupation"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="Hobbies"
                                    name="Hobbies"
                                    label="Hobbies"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="CountriesIvisited"
                                    name="CountriesIvisited"
                                    label="Visited Countries"
                                    fullWidth
                                    // autoComplete="CountriesIvisited"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="AboutMe"
                                    label="About me"
                                    name="AboutMe"
                                    multiline
                                    maxRows={5}
                                    fullWidth
                                    // onChange={handleChange}
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
                            Save
                        </Button>
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}
