import React from "react";

function HostCityItem({ post }) {
    return (
        <div className="postItem">
            <h6>
                {post.firstName} {post.lastName}
            </h6>
            <img src={post.img} alt="profil_photo" width="60px" />
            <h6>Destination : {post.residence.toUpperCase()}</h6>
            <h6> City :{post.city.toUpperCase()}</h6>
            <h6>Speaks : {post.languages[0]}</h6>
            <h6>Nombres of Rooms: {post.nbreOfRooms} </h6>
            <h6>Nombres of Beds: {post.nbreOfBeds} </h6>
            <p>{post.description}</p>
            <input type="button" value="Connect this Host" />
        </div>
    );
}

export default HostCityItem;
