/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { userId, getToken } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { getAllUsers, getUserPosts } from "../../redux/actions/adminActions";

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
    dispatch(getAllUsers({ id, token }));
    history.push("admin/usersList");
  };
  //Admin Get all Posts
  const handlePosts = () => {
    dispatch(getUserPosts({ id, token }));
    history.push("admin/allPosts");
  };

  // const handlePosts = () => {
  //   dispatch(getUserPosts({ id, token }));
  //   history.push("admin/allPosts");
  // };

  return (
    <div>
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="/home" className="brand-link">
            <img
              src="\uploads\logo.jpg"
              alt="WanderLust Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">Admin Panel</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
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
            {/* SidebarSearch Form */}
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
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
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
                      <a href="" className="nav-link" onClick={handleUsers}>
                        <i className="far fa-circle nav-icon" />
                        <p>All Users</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href=""
                        className="nav-link"
                        onClick={handlePosts}
                      >
                        <i className="far fa-circle nav-icon" />
                        All Posts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./index3.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>All Host Users</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="pages/widgets.html" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>
                      Destination
                      <span className="right badge badge-danger">New</span>
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-copy" />
                    <p>
                      Traveller Options
                      <i className="fas fa-angle-left right" />
                      <span className="badge badge-info right">6</span>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Top Navigation</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/layout/top-nav-sidebar.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Top Navigation + Sidebar</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/boxed.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Boxed</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/layout/fixed-sidebar.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Fixed Sidebar</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/layout/fixed-sidebar-custom.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>
                          Fixed Sidebar <small>+ Custom Area</small>
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/layout/fixed-topnav.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Fixed Navbar</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/layout/fixed-footer.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Fixed Footer</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/layout/collapsed-sidebar.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Collapsed Sidebar</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    </div>
  );
}

export default Menu;