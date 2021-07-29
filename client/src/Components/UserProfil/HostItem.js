import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
function HostItem({ host }) {
    const id = userId();
    const token = getToken();
    const [editHost, setEditHost] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const handelChange = (e) => {
        setEditHost({ ...editHost, [e.target.name]: e.target.value });
    };
    const showEditPost = () => {
        setShowEdit(true);
    };
    const cancelEdit = () => {
        setShowEdit(false);
    };
    const handleSaveEdit = () => {
        axios
            .put(`/api/host/editHosting/${id}`, editHost, {
                headers: {
                    jwt: token,
                    data: host._id,
                },
            })
            .then((response) => {
                Swal.fire({
                    title: "Save changes",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success",
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Save`,
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
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/host/deleteHosting/${id}`, {
                        headers: {
                            jwt: token,
                            data: host._id,
                        },
                    })
                    .then((response) => {
                        Swal.fire({
                            title: response.data.message,
                            showDenyButton: false,
                            showCancelButton: false,
                            icon: "success",
                            confirmButtonText: `Save`,
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
                            {host.firstName.toUpperCase()}{" "}
                            {host.lastName.toUpperCase()}
                        </h6>
                        <img src={host.img} alt="profil_photo" width="60px" />
                        <h6>Residence : {host.residence.toUpperCase()}</h6>
                        <h6> City :{host.city.toUpperCase()}</h6>
                        <h6>Speaks : {host.languages[0]}</h6>
                        <h6>Nombres of Rooms: {host.nbreOfRooms} </h6>
                        <h6>Nombres of Beds: {host.nbreOfBeds} </h6>
                        <p>{host.description}</p>
                        <input
                            type="button"
                            value="Edit"
                            onClick={showEditPost}
                        />
                        <input
                            type="button"
                            value="Delete"
                            onClick={handelDeletePost}
                        />
                    </div>
                )}
                {showEdit ? (
                    <div>
                        <input
                            type="text"
                            name="city"
                            defaultValue={host.city}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="nbreOfRooms"
                            defaultValue={host.nbreOfRooms}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="nbreOfBeds"
                            defaultValue={host.nbreOfBeds}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="price"
                            defaultValue={host.price}
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            name="description"
                            defaultValue={host.description}
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

export default HostItem;
