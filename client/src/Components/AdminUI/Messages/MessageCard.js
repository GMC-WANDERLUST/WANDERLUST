import React from "react";
import { userId, getToken } from "../../../utils";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Messages.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
function MessageCard({ message }) {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const deleteMessage = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/posts/deletePost/${id}`, {
                        headers: {
                            jwt: token,
                            data: message._id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        Swal.fire({
                            title: "Deleted successfully!",
                            showDenyButton: false,
                            showCancelButton: false,
                            icon: "success",
                            confirmButtonText: `Save`,
                            showLoaderOnConfirm: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };
    return (
        <div className="message-container">
            <div className="message-body">
                <p className="second-title">
                    <i className="far fa-clock mr-1" />
                    {message.date.split("T")[0]} at{" "}
                    {message.date.split("T")[1].split(".")[0]}
                </p>
                {/* <img
                        src="dist/img/user1-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 mr-3 img-circle"
                    /> */}
                <div>
                    <h3 className="dropdown-item-title">
                        {message.name}
                        {/* <span className="float-right text-sm text-danger">
                                <i className="fas fa-star" />
                            </span> */}
                    </h3>
                    <p className="second-title">{message.email}</p>
                    <p className="text-sm">{message.message}</p>
                </div>
            </div>
            <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={deleteMessage}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </div>
    );
}

export default MessageCard;
