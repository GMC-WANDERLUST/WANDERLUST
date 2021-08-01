import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserProfile,
    getUserPosts,
    addPost,
} from "../../redux/actions/userActions";
import { getUserHosts } from "../../redux/actions/hostActions";
import { userId, getToken } from "../../utils";
import ModalEditFirstName from "./ModalEditFirstName";
import ModalEditLastName from "./ModalEditLastName";
import ModalEditPhoto from "./ModalEditPhoto";
import ModalAddPost from "./ModalAddPost";
import "./UserProfile.css";
import PostItem from "./PostItem";
import HostItem from "./HostItem";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

function UserProfile() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    const [showPost, setShowPost] = useState(false);
    const [showHosts, setShowHosts] = useState(false);
    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
        dispatch(getUserPosts({ id, token }));
        dispatch(getUserHosts({ id, token }));
    }, [id, token, dispatch]);
    const user = useSelector((state) => state.userReducer.user);
    const userPost = useSelector((state) => state.postReducer.userPosts);
    const userHosts = useSelector((state) => state.hostingReducer.userHosts);
    const test = useSelector((state) => state.userReducer.test);
    const openPostModal = () => {
        dispatch(addPost());
    };
    const handleMyPosts = () => {
        setShowPost(!showPost);
    };
    const handleMyHosts = () => {
        setShowHosts(!showHosts);
    };
    return (
        <React.Fragment>
            <NavBar />
            {test ? (
                <div key={user._id}>
                    <img src={user.photo} alt="profile_photo" width="250px" />
                    <ModalEditPhoto action="Edit you photo" data={user.photo} />
                    <h1>{user.FirstName}</h1>
                    <ModalEditFirstName
                        action={"Edit First Name"}
                        data={user.FirstName}
                    />
                    <h1>{user.LastName}</h1>
                    <ModalEditLastName
                        action={"Edit Last Name"}
                        data={user.LastName}
                    />
                    <h2>{user.Country}</h2>
                    <h3>
                        {user.DayOfBirth} {user.MonthOfBirth} {user.YearOfBirth}
                    </h3>
                    <section>
                        <input
                            type="button"
                            value="Add Post"
                            onClick={openPostModal}
                        />
                        <input
                            type="button"
                            value={showPost ? "Hide" : "My Posts"}
                            onClick={handleMyPosts}
                        />
                        <input
                            type="button"
                            value={showHosts ? "Hide" : "My Hosts"}
                            onClick={handleMyHosts}
                        />
                        <ModalAddPost />
                    </section>
                    {showPost ? (
                        <article>
                            {userPost.map((post) => (
                                <div key={post._id}>
                                    <PostItem post={post} />
                                </div>
                            ))}
                        </article>
                    ) : null}
                    {showHosts ? (
                        <article>
                            {userHosts.map((host) => (
                                <div key={host._id}>
                                    <HostItem host={host} />
                                </div>
                            ))}
                        </article>
                    ) : null}
                </div>
            ) : (
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            )}
        </React.Fragment>
    );
}

export default UserProfile;
