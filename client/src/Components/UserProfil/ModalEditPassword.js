import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { userId, getToken } from "../../utils";
import { useSelector } from "react-redux";
import { close, openModal } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { logout } from "../../utils";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./Modals.css";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
///////////////////////////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(2) * 1)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding: theme.spacing(3),
        },
        height: "50hv",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(1) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: "25ch",
    },
}));

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "55%",
        backgroundColor: "whitesmoke",
    },
};

Modal.setAppElement("#root");

function ModalEditPassword({ open }) {
    ///////////////////////////////////////////////////////////////////////////////////
    // DECLARATIONS
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: "",
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    let id = userId();
    let token = getToken();
    let subtitle;
    const [newData, setNewData] = useState("");
    const test = useSelector((state) => state.modalReducer.test);
    const dispatch = useDispatch();
    const history = useHistory();
    ///////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#006064";
    }
    function handleclose() {
        dispatch(close());
    }
    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    ///////////////////////////////////////////////////////////////////////////////////
    // SAVE CHANGES
    const saveNewData = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
            showLoaderOnConfirm: true,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios
                    .put(`/api/user/editPassword/${id}`, newData, {
                        headers: {
                            jwt: token,
                        },
                    })
                    .then((response) => {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                        });
                        dispatch(close());
                        logout();
                        history.push("/login");
                    })
                    .catch((error) =>
                        Swal.fire(error.response.data.message, "", "error")
                    );
                // Swal.fire("Saved!", "", "success");
                dispatch(openModal());
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <Modal
                isOpen={test}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleclose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal-edit-password-close-button">
                    <CloseButton aria-label="Hide" onClick={handleclose}>
                        close
                    </CloseButton>
                </div>
                <h5 ref={(_subtitle) => (subtitle = _subtitle)}>
                    EDIT PASSWORD
                </h5>
                <div className="wl-modal-edit-password-container">
                    <main className={classes.layout}>
                        <div className="edit-password-body">
                            <Paper className={classes.paper}>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    align="center"
                                ></Typography>
                                <React.Fragment>
                                    <FormControl
                                        className={clsx(
                                            classes.margin,
                                            classes.textField
                                        )}
                                        onChange={handleChange}
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">
                                            Old Password
                                        </InputLabel>
                                        <Input
                                            required
                                            name="oldPassword"
                                            id="standard-adornment-password"
                                            type={
                                                values.showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            // value={values.password}
                                            // onChange={handleChange("password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                    >
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={clsx(
                                            classes.margin,
                                            classes.textField
                                        )}
                                        onChange={handleChange}
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">
                                            New Password
                                        </InputLabel>
                                        <Input
                                            required
                                            name="newpassword"
                                            id="standard-adornment-password"
                                            type={
                                                values.showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            // value={values.password}
                                            // onChange={handleChange("password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                    >
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={clsx(
                                            classes.margin,
                                            classes.textField
                                        )}
                                        onChange={handleChange}
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">
                                            Confirm New Password
                                        </InputLabel>
                                        <Input
                                            required
                                            name="repeat_newpassword"
                                            id="standard-adornment-password"
                                            type={
                                                values.showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            // value={values.password}
                                            // onChange={handleChange("password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                    >
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {/* <Grid container spacing={1}>
                                        <div className="button">
                                            <Button
                                                className={classes.button}
                                                startIcon={
                                                    show ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )
                                                }
                                                onClick={showPasswords}
                                            >
                                            </Button>
                                        </div>
                                        <div className="box">
                                            <Grid item xs={4} sm={4}>
                                                <TextField
                                                    required
                                                    id="Password"
                                                    name="oldPassword"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    label="Old Password"
                                                    fullWidth
                                                    autoComplete="current-password"
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <TextField
                                                    required
                                                    id="newpassword"
                                                    name="newpassword"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    label="New Password"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <TextField
                                                    required
                                                    id="repeat_newpassword"
                                                    name="repeat_newpassword"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    label="Confirm"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </div>
                                    </Grid> */}
                                </React.Fragment>
                            </Paper>
                        </div>
                        <div className="edit-password-button">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                // className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={saveNewData}
                            >
                                Save
                            </Button>
                        </div>
                    </main>
                </div>
            </Modal>
        </div>
    );
}
export default ModalEditPassword;
