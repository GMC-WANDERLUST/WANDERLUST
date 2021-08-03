/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { userId, getToken } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions/userActions";
import {} from "../../redux/actions/adminActions";
import { useHistory } from "react-router-dom";
// import { getAllUsers, getUserPosts } from "../../redux/actions/adminActions";
// import { showUsersList } from "../../redux/actions/adminActions";
// import axios from "axios";

function Menu() {
  const id = userId();
  const dispatch = useDispatch();
  const token = getToken();
  const user = useSelector((state) => state.userReducer.user);
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserProfile({ id, token }));
  }, [id, token, dispatch]);

  //Admin GET all Users
  const handleUsers = () => {
    // dispatch(showUsersList())
    // dispatch(getAllUsers({ id, token }));
    history.push("admin/usersList");
  };

  //Admin Get all Posts
  const handlePosts = () => {
    // axios
    //     .get(`/api/admin/allPosts/${id}`, {
    //         headers: {
    //             jwt: token,
    //         },
    //     })
    //     .then((response) => {
    //         let postsList = response.data.data;
    //         console.log(postsList);
    //     })
    //     .catch((error) => console.dir(error));
    history.push("admin/allPosts");
  };
  const handleHosts = () => {
    history.push("admin/allHosts");
  };
  const handleReportedUsers = () => {
    history.push("admin/reportedUsers");
  };
  const handleReportedPosts = () => {
    history.push("admin/reportedPosts");
  };

  return (
    <div>
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a href="/home" className="brand-link">
            <img
              src="\uploads\logo.jpg"
              alt="WanderLust Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">Admin Panel</span>
          </a>
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={user.photo}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href={`/profile/${id}`} className="d-block">
                  {`${user.FirstName} ${user.LastName}`}
                </a>
              </div>
            </div>
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item menu-open">
                  <a href="#" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Dashboard
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        href="#"
                        // value="Users List"
                        className="nav-link"
                        onClick={handleUsers}
                      >
                        <i className="far fa-circle nav-icon" />
                        All Users
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className="nav-link active"
                        onClick={handlePosts}
                      >
                        <i className="far fa-circle nav-icon" />
                        All Posts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" onClick={handleHosts}>
                        <i className="far fa-circle nav-icon" />
                        <p>All Host Users</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className="nav-link"
                        onClick={handleReportedUsers}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>All Reported Users</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        className="nav-link"
                        onClick={handleReportedPosts}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>All Reported Posts</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Menu;
