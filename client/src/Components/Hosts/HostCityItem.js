import React from "react";
import { Link } from "react-router-dom";

function HostCityItem({ host }) {
    const saveUserId = () => {
        sessionStorage.setItem("randomId", host.host);
    };
    return (
        <div className="postItem">
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
            <p>{host.description}</p>
            <input type="button" value="Connect this Host" />
        </div>
    );
}

export default HostCityItem;
