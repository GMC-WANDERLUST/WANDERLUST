/* eslint-disable array-callback-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userId, getToken } from "../../utils";
import {
    getAllUsers,
    adminGetUsersPosts,
    adminGetHosts,
    adminGetReportedPosts,
    adminGetReportedHosts,
    adminGetMessages,
} from "../../redux/actions/adminActions";
import "./Dashbord.css";
import CardHost from "./HostsList/CardHost";
import CardUser from "./UsersList/CardUser";
import CardPost from "./PostsList/CardPost";
import Button from "@material-ui/core/Button";
import { MdReport, MdMessage } from "react-icons/md";

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
        dispatch(adminGetReportedHosts({ id, token }));
        dispatch(adminGetMessages({ id, token }));
    }, [id, token, dispatch]);

    const users = useSelector((state) => state.adminReducer.usersList);
    const posts = useSelector((state) => state.adminReducer.adminPostsList);
    console.log("posts", posts);
    const reportedPosts = useSelector(
        (state) => state.adminReducer.adminReportedPosts
    );
    const reportedHosts = useSelector(
        (state) => state.adminReducer.adminReportedHosts
    );
    const hosts = useSelector((state) => state.adminReducer.adminHostsList);
    const messages = useSelector((state) => state.adminReducer.messages);
    let numberOfPosts = posts.length;
    let numberOfUsers = users.length;
    let numberOfHosts = hosts.length;
    let numberOfReportedPosts = reportedPosts.length;
    let numberOfReportedHosts = reportedHosts.length;
    let numberOfMessages = messages.length;

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
    const viewAllReportedHosts = () => {
        // dispatch(showUsersList())
        // dispatch(getAllUsers({ id, token }));
        history.push("admin/allReportedHosts");
    };
    const viewAllReportedPosts = () => {
        // dispatch(showUsersList())
        // dispatch(getAllUsers({ id, token }));
        history.push("admin/allReportedPosts");
    };

    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">
                                    WanderLust Admin Interface
                                </h1>
                            </div>
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
                            </div>
                        </div>
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
                            </div>
                        </div>
                        <div className="clearfix hidden-md-up" />
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-success elevation-1">
                                    <MdReport />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Reported Posts:
                                    </span>
                                    <span className="info-box-number">
                                        {numberOfReportedPosts}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-success elevation-1">
                                    <MdReport />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Reported Hosts:
                                    </span>
                                    <span className="info-box-number">
                                        {numberOfReportedHosts}
                                    </span>
                                </div>
                            </div>
                        </div>
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
                            </div>
                        </div>
                        <div className="messages col-12 col-sm-6 col-md-3">
                            <a href="/messages/list">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-success elevation-1">
                                        <MdMessage />
                                    </span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">
                                            Messages:
                                        </span>
                                        <span className="info-box-number">
                                            {numberOfMessages}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="reportedHosts">
                        <h4>Reported Hosts </h4>
                        <div className="admin-wl-reportedHostItem">
                            {reportedHosts
                                // eslint-disable-next-line array-callback-return
                                .map((host, index) => {
                                    if (index < 3) {
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
                        <br />

                        <div>
                            {numberOfReportedHosts > 1 ? (
                                <Button
                                    onClick={viewAllReportedHosts}
                                    variant="contained"
                                    color="primary"
                                >
                                    View all posts
                                </Button>
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="reportedPosts">
                        <h4>Reported Travellers</h4>
                        <div className="admin-wl-reportedPostItem">
                            {reportedPosts
                                .map((post, index) => {
                                    if (index < 4) {
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
                            {numberOfReportedPosts > 2 ? (
                                <Button
                                    onClick={viewAllReportedPosts}
                                    variant="contained"
                                    color="primary"
                                >
                                    View all posts
                                </Button>
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="usersList">
                        <h4>Travellers List</h4>
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
                                <Button
                                    onClick={viewAllUsers}
                                    variant="contained"
                                    color="primary"
                                >
                                    View all users
                                </Button>
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="hostsList">
                        <h4>Host's Posts List</h4>
                        <div className="admin-wl-hostItem">
                            {hosts
                                .map((host, index) => {
                                    if (index < 3) {
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
                            {numberOfHosts > 3 ? (
                                <Button
                                    onClick={viewAllHosts}
                                    variant="contained"
                                    color="primary"
                                >
                                    View all posts
                                </Button>
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <div className="postsList">
                        <h4>Traveller's Posts List</h4>
                        <div className="admin-wl-postItem">
                            {posts
                                .map((post, index) => {
                                    if (index < 3) {
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
                            {numberOfPosts > 5 ? (
                                <Button
                                    onClick={viewAllPosts}
                                    variant="contained"
                                    color="primary"
                                >
                                    View all posts
                                </Button>
                            ) : null}
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
