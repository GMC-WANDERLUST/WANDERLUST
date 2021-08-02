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
    adminGetHosts,
    adminGetReportedPosts,
} from "../../redux/actions/adminActions";
import "./Dashbord.css";
import CardHost from "./HostsList/CardHost";
import CardUser from "./UsersList/CardUser";
import CardPost from "./PostsList/CardPost";

function DashBoard() {
    // const show = useSelector((state) => state.adminReducer.show);
    let id = userId();
    let token = getToken();
    let dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(getAllUsers({ id, token }));
        dispatch(adminGetUsersPosts({ id, token }));
        dispatch(adminGetHosts({ id, token }));
        dispatch(adminGetReportedPosts({ id, token }));
    }, [id, token, dispatch]);
    // const [showUsers, setShowUsers] = useState(false);
    // const [showUPosts, setShowPosts] = useState(false);
    // const handelShow = () => {
    //     setShowUsers(!showUsers);
    // };
    // const handelShowPosts = () => {
    //     setShowPosts(!showUPosts);
    // };
    const users = useSelector((state) => state.adminReducer.usersList);
    const posts = useSelector((state) => state.adminReducer.adminPostsList);
    const reportedPosts = useSelector(
        (state) => state.adminReducer.adminReportedPosts
    );
    const hosts = useSelector((state) => state.adminReducer.adminHostsList);
    let numberOfPosts = posts.length;
    let numberOfUsers = users.length;
    let numberOfHosts = hosts.length;
    let numberOfReportedPosts = reportedPosts.length;

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
    const viewAllHosts = () => {
        // dispatch(showUsersList())
        // dispatch(getAllUsers({ id, token }));
        history.push("admin/allHosts");
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
                                    <i className="fas fa-clipboard" />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Hosting Posts
                                    </span>
                                    <span className="info-box-number">
                                        {numberOfHosts}
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
                    <div className="reportedPosts">
                        <h4>Reported Posts</h4>
                        <div className="admin-wl-reportedPostItem">
                            {reportedPosts
                                .map((post, index) => {
                                    if (index <= 8) {
                                        return (
                                            <div key={post._id}>
                                                <CardPost
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
                            {numberOfUsers >= 8 ? (
                                <input
                                    type="button"
                                    value="View all users"
                                    onClick={viewAllUsers}
                                />
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="usersList">
                        <h4>Users List</h4>
                        <div className="admin-wl-userItem">
                            {users
                                .map((user, index) => {
                                    if (index <= 8) {
                                        return (
                                            <div key={user._id}>
                                                <CardUser
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
                        <div>
                            {numberOfUsers >= 8 ? (
                                <input
                                    type="button"
                                    value="View all users"
                                    onClick={viewAllUsers}
                                />
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="postsList">
                        <h4>Posts List</h4>
                        <div className="admin-wl-postItem">
                            {posts
                                .map((post, index) => {
                                    if (index <= 12) {
                                        return (
                                            <div key={post._id}>
                                                <CardPost
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
                            {numberOfPosts >= 12 ? (
                                <input
                                    type="button"
                                    value="View all posts"
                                    onClick={viewAllPosts}
                                />
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="hostsList">
                        <h4>Hosts List</h4>
                        <div className="admin-wl-hostItem">
                            {hosts
                                .map((host, index) => {
                                    if (index <= 8) {
                                        return (
                                            <div key={host._id}>
                                                <CardHost
                                                    token={token}
                                                    host={host}
                                                    id={id}
                                                />
                                            </div>
                                        );
                                    }
                                })
                                .reverse()}
                        </div>
                        <div>
                            {numberOfHosts >= 8 ? (
                                <input
                                    type="button"
                                    value="View all Hosts"
                                    onClick={viewAllHosts}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
