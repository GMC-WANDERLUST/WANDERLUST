import React from "react";

function RandomHostItem({ host }) {
    return (
        <React.Fragment>
            <section className="post">
                <div className="postItem">
                    <h6>
                        {host.firstName.toUpperCase()}
                        {host.lastName.toUpperCase()}
                    </h6>
                    <img src={host.img} alt="profil_photo" width="60px" />
                    <h6>Residence : {host.residence.toUpperCase()}</h6>
                    <h6> City :{host.city.toUpperCase()}</h6>
                    <h6>Speaks : {host.languages[0]}</h6>
                    <h6>Nombres of Rooms: {host.nbreOfRooms} </h6>
                    <h6>Nombres of Beds: {host.nbreOfBeds} </h6>
                    <p>{host.description}</p>
                </div>
            </section>
        </React.Fragment>
    );
}

export default RandomHostItem;
