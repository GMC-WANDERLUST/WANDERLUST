import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
    getRandomUserProfile,
    getRandomUserPosts,
    addPost,
} from "../../redux/actions/userActions";
import { getRandomUserHosts } from "../../redux/actions/hostActions";
import { userId, getToken } from "../../utils";
import "../UserProfil/UserProfile.css";
import RandomPostItem from "./RandomPostItem";
import RandomHostItem from "./RandomHostItem";

function RandomProfile() {
    let id = userId();
    let rId = sessionStorage.getItem("randomId");
    let token = getToken();
    const dispatch = useDispatch();
    const [showPost, setShowPost] = useState(false);
    const [showHosts, setShowHosts] = useState(false);
    useEffect(() => {
        dispatch(getRandomUserProfile({ rId, token }));
        dispatch(getRandomUserPosts({ rId, token }));
        dispatch(getRandomUserHosts({ rId, token }));
    }, [id, token, dispatch]);
    const user = useSelector((state) => state.userReducer.user);
    const userPost = useSelector((state) => state.postReducer.userPosts);
    const userHosts = useSelector((state) => state.hostingReducer.userHosts);
    const handleMyPosts = () => {
        setShowPost(!showPost);
    };
    const handleMyHosts = () => {
        setShowHosts(!showHosts);
    };
    return (
        <React.Fragment>
            <NavBar />
            <h1>This is the user Profile</h1>
            <div key={user._id}>
                <img src={user.photo} alt="profile_photo" width="250px" />
                <h1>{user.FirstName}</h1>
                <h1>{user.LastName}</h1>
                <h2>{user.Country}</h2>
                <h3>
                    {user.DayOfBirth} {user.MonthOfBirth} {user.YearOfBirth}
                </h3>
                <section>
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
                </section>
                {showPost ? (
                    <article>
                        {userPost.map((post) => (
                            <div key={post._id}>
                                <RandomPostItem post={post} />
                            </div>
                        ))}
                    </article>
                ) : null}
                {showHosts ? (
                    <article>
                        {userHosts.map((host) => (
                            <div key={host._id}>
                                <RandomHostItem host={host} />
                            </div>
                        ))}
                    </article>
                ) : null}
            </div>
        </React.Fragment>
    );
}

export default RandomProfile;
