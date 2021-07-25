import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import {
    getUserProfile,
    getUserPosts,
    addPost,
} from "../../redux/actions/userActions";
import { userId, getToken } from "../../utils";
import ModalEditFirstName from "./ModalEditFirstName";
import ModalEditLastName from "./ModalEditLastName";
import ModalEditPhoto from "./ModalEditPhoto";
import ModalAddPost from "./ModalAddPost";
import "./UserProfile.css";

function UserProfile() {
    let id = userId();
    let token = getToken();
    // const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
        dispatch(getUserPosts({ id, token }));
    }, [id, token, dispatch]);
    const user = useSelector((state) => state.userReducer.user);
    const userPost = useSelector((state) => state.postReducer.userPosts);
    console.log("user post: ", userPost);
    const openPostModal = () => {
        dispatch(addPost());
    };
    // console.log("user", user);
    return (
        <React.Fragment>
            <NavBar />
            <h1>This is the user Profile</h1>
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
                    <ModalAddPost />
                </section>
                <article>
                    {userPost.map((post) => (
                        <div key={post._id}>
                            <h6>
                                {post.firstName} {post.lastName}
                            </h6>
                            <img
                                src={post.img}
                                alt="profil_photo"
                                width="60px"
                            />
                            <h6>Destination : {post.destination}</h6>
                            <h6> City :{post.city}</h6>
                            <p>
                                from {post.check_in} to {post.check_out}
                            </p>
                            <h6>Speaks : {post.languages}</h6>

                            <h6>Nombres of Guests: {post.nbreOfGuests[0]} </h6>
                            <p>{post.description}</p>
                        </div>
                    ))}
                </article>
            </div>
            {/* {user.map((info) => (
               
            ))} */}
        </React.Fragment>
    );
}

export default UserProfile;
