import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { userId, getToken } from "../../utils";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import axios from "axios";
import "./AddPhoto.css";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
function AddProfilePhoto() {
    const classes = useStyles();

    let id = userId();
    const [uploadFile, setUploadFile] = useState();
    const [url, setUrl] = useState("");
    const [test, setTest] = useState(false);
    let token = getToken();
    const handelChange = (e) => {
        setUploadFile(e.target.files[0]);
    };
    // const dispatch = useDispatch();
    // const userObject = useSelector((state) => state.userReducer.user);
    const history = useHistory();

    // Photo Upload
    const submitForm = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("photo", uploadFile, uploadFile.name);
        // dispatch(fillUserProfile({ bodyFormData, token, id }));
        axios
            .put(`/api/profile/updateUserPhoto/${id}`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    jwt: token,
                },
                onUploadProgress: (progressEvent) =>
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Photo uploaded Successfully",
                        text: `Upload Progress : ${Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        )}
                        "%`,
                        showConfirmButton: false,
                        timer: 1200,
                    }),
            })
            .then((response) => {
                setUrl(response.data.url);
                setTest(true);
            })
            .catch((error) => {
                console.dir(error);
            });
    };
    const handleForward = () => {
        history.push(`/profile/${id}`);
    };

    return (
        <div>
            {/* <NavBar /> */}
            <div className="wl-ap-container">
                <main className="ap-main">
                    <div className="please">
                        <h5>PLEASE UPLOAD YOUR PROFILE PHOTO</h5>
                        {url ? (
                            <img src={url} alt="profile_photo" width="250px" />
                        ) : (
                            <img
                                src="/uploads/user.png"
                                alt="profile_photo"
                                width="250px"
                            />
                        )}

                        <form className="ap-form">
                            <div className="chooseFile">
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handelChange}
                                />
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon />}
                                    onClick={submitForm}
                                >
                                    Upload
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <Button
                            disabled={url ? false : true}
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={handleForward}
                        >
                            Save
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AddProfilePhoto;
