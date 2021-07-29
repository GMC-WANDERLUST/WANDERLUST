import axios from "axios";
import React, { useState } from "react";
import { userId, getToken } from "../../utils";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function RandomPostItem({ post }) {
    return (
        <React.Fragment>
            <section className="post">
                
                    <div className="postItem">
                        <h6>
                            {post.firstName}
                            {post.lastName}
                        </h6>
                        <img src={post.img} alt="profil_photo" width="60px" />
                        <h6>Destination : {post.destination.toUpperCase()}</h6>
                        <h6> City :{post.city.toUpperCase()}</h6>
                        <p>
                            from {post.check_in} to {post.check_out}
                        </p>
                        <h6>Speaks : {post.languages}</h6>

                        <h6>Nombres of Guests: {post.nbreOfGuests[0]} </h6>
                        <p>{post.description}</p>
                    </div>
            </section>
        </React.Fragment>
    );
}

export default RandomPostItem;
