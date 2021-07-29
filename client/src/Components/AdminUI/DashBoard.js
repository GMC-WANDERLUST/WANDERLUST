/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function DashBoard() {
  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">WanderLust Admin Interface</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/home">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
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
                        1,111
                        
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
                      <span className="info-box-number">41,410</span>
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
                      <span className="info-box-text">New Registrations</span>
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
                      <span className="info-box-text">All Members</span>
                      <span className="info-box-number">2,000</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
              </div>
              </div>

              <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="ion ion-clipboard mr-1" />
                To Do List
              </h3>
              <div className="card-tools">
                <ul className="pagination pagination-sm">
                  <li className="page-item"><a href="#" className="page-link">«</a></li>
                  <li className="page-item"><a href="#" className="page-link">1</a></li>
                  <li className="page-item"><a href="#" className="page-link">2</a></li>
                  <li className="page-item"><a href="#" className="page-link">3</a></li>
                  <li className="page-item"><a href="#" className="page-link">»</a></li>
                </ul>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <ul className="todo-list" data-widget="todo-list">
                <li>
                  {/* drag handle */}
                  <span className="handle">
                    <i className="fas fa-ellipsis-v" />
                    <i className="fas fa-ellipsis-v" />
                  </span>
                  {/* checkbox */}
                  <div className="icheck-primary d-inline ml-2">
                    <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                    <label htmlFor="todoCheck1" />
                  </div>
                  {/* todo text */}
                  <span className="text">Design a nice theme</span>
                  {/* Emphasis label */}
                  <small className="badge badge-danger"><i className="far fa-clock" /> 2 mins</small>
                  {/* General tools such as edit or delete*/}
                  <div className="tools">
                    <i className="fas fa-edit" />
                    <i className="fas fa-trash-o" />
                  </div>
                </li>
                <li>
                  <span className="handle">
                    <i className="fas fa-ellipsis-v" />
                    <i className="fas fa-ellipsis-v" />
                  </span>
                  <div className="icheck-primary d-inline ml-2">
                    <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                    <label htmlFor="todoCheck2" />
                  </div>
                  <span className="text">Make the theme responsive</span>
                  <small className="badge badge-info"><i className="far fa-clock" /> 4 hours</small>
                  <div className="tools">
                    <i className="fas fa-edit" />
                    <i className="fas fa-trash-o" />
                  </div>
                </li>
                <li>
                  <span className="handle">
                    <i className="fas fa-ellipsis-v" />
                    <i className="fas fa-ellipsis-v" />
                  </span>
                  <div className="icheck-primary d-inline ml-2">
                    <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                    <label htmlFor="todoCheck3" />
                  </div>
                  <span className="text">Let theme shine like a star</span>
                  <small className="badge badge-warning"><i className="far fa-clock" /> 1 day</small>
                  <div className="tools">
                    <i className="fas fa-edit" />
                    <i className="fas fa-trash-o" />
                  </div>
                </li>
                <li>
                  <span className="handle">
                    <i className="fas fa-ellipsis-v" />
                    <i className="fas fa-ellipsis-v" />
                  </span>
                  <div className="icheck-primary d-inline ml-2">
                    <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                    <label htmlFor="todoCheck4" />
                  </div>
                  <span className="text">Let theme shine like a star</span>
                  <small className="badge badge-success"><i className="far fa-clock" /> 3 days</small>
                  <div className="tools">
                    <i className="fas fa-edit" />
                    <i className="fas fa-trash-o" />
                  </div>
                </li>
                <li>
                  <span className="handle">
                    <i className="fas fa-ellipsis-v" />
                    <i className="fas fa-ellipsis-v" />
                  </span>
                  <div className="icheck-primary d-inline ml-2">
                    <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                    <label htmlFor="todoCheck5" />
                  </div>
                  <span className="text">Check your messages and notifications</span>
                  <small className="badge badge-primary"><i className="far fa-clock" /> 1 week</small>
                  <div className="tools">
                    <i className="fas fa-edit" />
                    <i className="fas fa-trash-o" />
                  </div>
                </li>
                <li>
                  <span className="handle">
                    <i className="fas fa-ellipsis-v" />
                    <i className="fas fa-ellipsis-v" />
                  </span>
                  <div className="icheck-primary d-inline ml-2">
                    <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                    <label htmlFor="todoCheck6" />
                  </div>
                  <span className="text">Let theme shine like a star</span>
                  <small className="badge badge-secondary"><i className="far fa-clock" /> 1 month</small>
                  <div className="tools">
                    <i className="fas fa-edit" />
                    <i className="fas fa-trash-o" />
                  </div>
                </li>
              </ul>
            </div>
            </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
export default DashBoard
||||||| merged common ancestors

export default DashBoard
=======

export default DashBoard;
>>>>>>> 2d38cb7da4e4724bd30c72967587f26866646aa5
