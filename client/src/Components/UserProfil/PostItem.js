import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function PostItem({ post }) {
    const id = userId();
    const token = getToken();
    const [editPost, setEditPost] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const handelChange = (e) => {
        setEditPost({ ...editPost, [e.target.name]: e.target.value });
    };
    const showEditPost = () => {
        setShowEdit(true);
    };
    const cancelEdit = () => {
        setShowEdit(false);
    };
    const handleSaveEdit = () => {
        axios
            .put(
                `/api/posts/editPost/${id}`,
                { editPost, _id: post._id },
                {
                    headers: {
                        jwt: token,
                    },
                }
            )
            .then((response) => {
                Swal.fire({
                    title: "Save changes",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                    showLoaderOnConfirm: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Save`,
                            showLoaderOnConfirm: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                });
            })
            .catch((error) => console.dir(error));
    };
    const handelDeletePost = () => {
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
                            _id: post._id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        Swal.fire({
                            title: response.data.message,
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
                        Swal.fire(error.data.data.message, "error");
                        setShowEdit(true);
                    });
            }
        });
    };
    return (
        <React.Fragment>
            <section className="post">
                {showEdit ? null : (
                    <div className="postItem">
                            <h6>
                                {post.firstName}
                                {post.lastName}
                            </h6>
                        <img src={post.img} alt="profil_photo" width="60px" />
                        <h6>Destination : {post.destination.toUpperCase()}</h6>
                        <h6> City :{post.city.toUpperCase()}</h6>
                        <p>
                            from {post.check_in} to {post.check_out}
                        </p>
                        <h6>Speaks : {post.languages}</h6>

                        <h6>Nombres of Guests: {post.nbreOfGuests[0]} </h6>
                        <p>{post.description}</p>
                        <input
                            type="button"
                            value="Edit post"
                            onClick={showEditPost}
                        />
                        <input
                            type="button"
                            value="Delete post"
                            onClick={handelDeletePost}
                        />
                    </div>
                )}
                {showEdit ? (
                    <div>
                        <input
                            type="text"
                            name="destination"
                            defaultValue={post.destination}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="city"
                            defaultValue={post.city}
                            onChange={handelChange}
                        />
                        <input
                            type="date"
                            name="check_in"
                            defaultValue={post.check_in}
                            onChange={handelChange}
                        />
                        <input
                            type="date"
                            name="check_out"
                            defaultValue={post.check_out}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="nbreOfGuests"
                            defaultValue={post.nbreOfGuests}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="description"
                            defaultValue={post.description}
                            onChange={handelChange}
                        />
                        <input
                            type="button"
                            value="Save changes"
                            onClick={handleSaveEdit}
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={cancelEdit}
                        />
                    </div>
                ) : null}
            </section>
        </React.Fragment>
    );
}

export default PostItem;
