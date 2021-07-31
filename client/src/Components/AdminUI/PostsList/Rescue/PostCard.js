import React from "react";
import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { userId, getToken } from "../../../utils";
function PostsCard({ post }) {
    let id = userId();
    let token = getToken();
    const handleDelete = () => {
        axios
            .delete(`/api/admin/deletePost/${id}`, {
                headers: {
                    jwt: token,
                    data: post._id,
                },
            })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => console.dir(error));
    };
    return (
        <div>
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={post.img} height="450px" />
                <Card.Body>
                    <Card.Title>
                        {post.firstName.toUpperCase()}{" "}
                        {post.lastName.toUpperCase()}
                    </Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        Destination :{post.destination.toUpperCase()}
                    </ListGroupItem>
                    <ListGroupItem>
                        City :{post.city.toUpperCase()}
                    </ListGroupItem>
                    <ListGroupItem>From : {post.check_in}</ListGroupItem>
                    <ListGroupItem>To : {post.check_out} </ListGroupItem>
                    <ListGroupItem>
                        Nombre of Guests : {post.nbreOfGuests}
                    </ListGroupItem>
                </ListGroup>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Delete this post
                </Button>
            </Card>
        </div>
    );
}

export default PostsCard;
