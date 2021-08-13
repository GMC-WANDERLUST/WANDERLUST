import React, { useEffect } from "react";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetMessages } from "../../../redux/actions/adminActions";
import MessageCard from "./MessageCard";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

function MessagesList() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(adminGetMessages({ id, token }));
    }, [id, token, dispatch]);
    const messages = useSelector((state) => state.adminReducer.messages);
    const backHome = () => {
        history.push(`/adminUi/${id}`);
    };

    return (
        <div className="wl-messages-container">
            <h1>MESSAGES LIST</h1>
            {messages.map((message) => (
                <div key={message._id}>
                    <MessageCard message={message} />
                </div>
            ))}
            <Button color="primary" onClick={backHome}>
                Back
            </Button>
        </div>
    );
}

export default MessagesList;
