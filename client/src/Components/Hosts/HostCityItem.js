import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";

function HostCityItem({ host }) {
    let id = userId();
    let token = getToken();
    const saveUserId = () => {
        sessionStorage.setItem("randomId", host.host);
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
                        { id: host._id },
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
    let dateTab = host.date.split("T");
    return (
        <div className="postItem">
            <p>
                {dateTab[0]} at {dateTab[1].split(".")[0]}
            </p>
            <Link to={`/uprofile/${host.host}`} onClick={saveUserId}>
                <h6>
                    {host.firstName} {host.lastName}
                </h6>
            </Link>
            <img src={host.img} alt="profil_photo" width="60px" />
            <h6>Destination : {host.residence.toUpperCase()}</h6>
            <h6> City :{host.city.toUpperCase()}</h6>
            <h6>Speaks : {host.languages[0]}</h6>
            <h6>Nombres of Rooms: {host.nbreOfRooms} </h6>
            <h6>Nombres of Beds: {host.nbreOfBeds} </h6>
            <p>" {host.description} "</p>
            {id === host.host ? null : (
                <div>
                    <input type="button" value="Message" />
                    {host.isReported === 1 ? (
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

export default HostCityItem;
