import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
function PostDestinationItem({ post }) {
    let id = userId();
    let token = getToken();
    const saveUserId = () => {
        sessionStorage.setItem("randomId", post.user);
    };
    const handleReport = () => {
        Swal.fire({
            title: "Send Report?",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, report it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(
                        `/api/posts/reportPost/${id}`,
                        { id: post._id },
                        {
                            headers: {
                                jwt: token,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                        Swal.fire({
                            title: response.data.message.toUpperCase(),
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `OK`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        console.dir(error);
                    });
            }
        });
    };
    let dateTab = post.date.split("T");
    return (
        <div className="postItem">
            <p>
                {dateTab[0]} at {dateTab[1].split(".")[0]}
            </p>
            <Link to={`/uprofile/${post.user}`} onClick={saveUserId}>
                <h6>
                    {post.firstName.toUpperCase()} {post.lastName.toUpperCase()}
                </h6>
            </Link>
            <img src={post.img} alt="profil_photo" width="60px" />
            <h6>Destination : {post.destination.toUpperCase()}</h6>
            <h6> City :{post.city.toUpperCase()}</h6>
            <p>
                From : {post.check_in} To {post.check_out}
            </p>
            <h6>Speaks : {post.languages}</h6>
            <h6>Nombres of Guests: {post.nbreOfGuests[0]} </h6>
            <p>{post.description}</p>
            {id === post.user ? null : (
                <div>
                    <input type="button" value="Send a hosting request" />
                    {post.isReported === 1 ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled
                            onClick={handleReport}
                        >
                            Report
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReport}
                        >
                            Report
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostDestinationItem;
