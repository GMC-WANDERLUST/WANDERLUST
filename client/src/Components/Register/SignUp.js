import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

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
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SignUp() {
    const classes = useStyles();
    let d = new Date();
    let currentYear = d.getFullYear();
    const history = useHistory();
    const [newUser, setNewUser] = useState({});
    const handelChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        axios
            .post("/api/user/register", newUser)
            .then((response) => {
                Swal.fire({
                    title: response.data.message.toUpperCase(),
                    icon: "success",
                    text: "The journey starts now!",
                    confirmButtonText: "GO NOW",
                });
                history.push("/login");
            })
            .catch((error) =>
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                })
            );
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="FirstName"
                                name="FirstName"
                                variant="outlined"
                                required={true}
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handelChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                id="LastName"
                                label="Last Name"
                                name="LastName"
                                autoComplete="LastName"
                                onChange={handelChange}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 31 } }}
                                id="DayOfBirth"
                                label="Day"
                                name="DayOfBirth"
                                // autoComplete="lname"
                                onChange={handelChange}
                            />
                        </Grid>
                        <Grid item xs={3} sm={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                    Month
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="MonthOfBirth"
                                    // value={age}
                                    onChange={handelChange}
                                >
                                    <MenuItem
                                        value="January"
                                        name="MonthOfBirth"
                                    >
                                        January
                                    </MenuItem>
                                    <MenuItem
                                        value="February"
                                        name="MonthOfBirth"
                                    >
                                        February
                                    </MenuItem>
                                    <MenuItem value="March" name="MonthOfBirth">
                                        March
                                    </MenuItem>
                                    <MenuItem value="April" name="MonthOfBirth">
                                        April
                                    </MenuItem>
                                    <MenuItem value="Mai" name="MonthOfBirth">
                                        Mai
                                    </MenuItem>
                                    <MenuItem value="June" name="MonthOfBirth">
                                        June
                                    </MenuItem>
                                    <MenuItem value="July" name="MonthOfBirth">
                                        July
                                    </MenuItem>
                                    <MenuItem
                                        value="August"
                                        name="MonthOfBirth"
                                    >
                                        August
                                    </MenuItem>
                                    <MenuItem
                                        value="September"
                                        name="MonthOfBirth"
                                    >
                                        September
                                    </MenuItem>
                                    <MenuItem
                                        value="October"
                                        name="MonthOfBirth"
                                    >
                                        October
                                    </MenuItem>
                                    <MenuItem
                                        value="November"
                                        name="MonthOfBirth"
                                    >
                                        November
                                    </MenuItem>
                                    <MenuItem
                                        value="December"
                                        name="MonthOfBirth"
                                    >
                                        December
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} sm={4}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                type="number"
                                InputProps={{
                                    inputProps: { min: 0, max: currentYear },
                                }}
                                id="YearOfBirth"
                                label="Year"
                                name="YearOfBirth"
                                // autoComplete="lname"
                                onChange={handelChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handelChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handelChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                name="repeat_password"
                                label="Confirm"
                                type="password"
                                id="repeat_password"
                                onChange={handelChange}

                                // autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleRegister}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default SignUp;
