import React from "react";
import "./NewUserProfile.css";
import NavBar from "../NavBar/NavBar";
function NewUserProfile() {
    return (
        <React.Fragment>
            <NavBar />
            <div className="wl-newUserProfile-container">
                <div className="wl-newUserProfile-leftBox">
                    <div className="wl-user-photoBox">Photo</div>
                    <div className="wl-user-infos">Infos</div>
                    <div className="wl-user-hobbies">Hobbies</div>
                </div>
                <div className="wl-newUserProfile-rightBox">
                    <div className="wl-NameAndSomeIformations">Name + Some Informations</div>
                    <div className="PostsAndHosts">Timeline : Posts + Hosts</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NewUserProfile;
