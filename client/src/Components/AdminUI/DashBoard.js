/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userId, getToken } from "../../utils";
import {
    getAllUsers,
    adminGetUsersPosts,
} from "../../redux/actions/adminActions";
import UserCard from "./UsersList/UserCard";
import PostsCard from "./PostsList/PostCard";
import "./Dashbord.css";

function DashBoard() {
    // const show = useSelector((state) => state.adminReducer.show);
    let id = userId();
    let token = getToken();
    let dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(getAllUsers({ id, token }));
        dispatch(adminGetUsersPosts({ id, token }));
    }, [id, token, dispatch]);
    const [showUsers, setShowUsers] = useState(false);
    const [showUPosts, setShowPosts] = useState(false);
    const handelShow = () => {
        setShowUsers(!showUsers);
    };
    const handelShowPosts = () => {
        setShowPosts(!showUPosts);
    };
    const users = useSelector((state) => state.adminReducer.usersList);
    const posts = useSelector((state) => state.adminReducer.adminPostsList);
    let numberOfPosts = posts.length;
    let numberOfUsers = users.length;
    const viewAllUsers = () => {
        // dispatch(showUsersList())
        // dispatch(getAllUsers({ id, token }));
        history.push("admin/usersList");
    };
    const viewAllPosts = () => {
        // dispatch(showUsersList())
        // dispatch(getAllUsers({ id, token }));
        history.push("admin/allPosts");
    };

    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">
                                    WanderLust Admin Interface
                                </h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="/home">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Dashboard
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    {/* Info boxes */}
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-info elevation-1">
                                    <i className="fas fa-clipboard" />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Posts</span>
                                    <span className="info-box-number">
                                        {numberOfPosts}
                                    </span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-danger elevation-1">
                                    <i className="fas fa-thumbs-up" />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Likes</span>
                                    <span className="info-box-number">
                                        41,410
                                    </span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        {/* fix for small devices only */}
                        <div className="clearfix hidden-md-up" />
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-success elevation-1">
                                    <i className="fas fa-user-plus" />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        New Registrations
                                    </span>
                                    <span className="info-box-number">760</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-warning elevation-1">
                                    <i className="fas fa-users" />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        All Members
                                    </span>
                                    <span className="info-box-number">
                                        {numberOfUsers}
                                    </span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="usersList">
                            {users
                                .map((user, index) => {
                                    if (index <= 8) {
                                        return (
                                            <div key={user._id}>
                                                <UserCard
                                                    token={token}
                                                    user={user}
                                                    id={id}
                                                />
                                            </div>
                                        );
                                    }
                                })
                                .reverse()}
                        </div>
                        {numberOfUsers >= 8 ? (
                            <input
                                type="button"
                                value="View all users"
                                onClick={viewAllUsers}
                            />
                        ) : null}
                    </div>
                    <br />
                    <div className="postsList">
                        {posts
                            .map((post, index) => {
                                if (index <= 5) {
                                    return (
                                        <div key={post._id}>
                                            <PostsCard
                                                token={token}
                                                post={post}
                                                id={id}
                                            />
                                        </div>
                                    );
                                }
                            })
                            .reverse()}
                    </div>
                    <div>
                        {numberOfPosts >= 5 ? (
                            <input
                                type="button"
                                value="View all posts"
                                onClick={viewAllPosts}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
