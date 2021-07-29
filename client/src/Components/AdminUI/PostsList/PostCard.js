import React from "react";
import {
    Card,
    ListGroupItem,
    ListGroup,
   
} from "react-bootstrap";

function PostsCard({ id, post }) {
    return (
        <div>
            
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={post.img} height='450px' />
                <Card.Body>
                    <Card.Title>
                        {post.firstName.toUpperCase()}{" "}
                        {post.lastName.toLowerCase()}
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
                        Nombre of Guests : {post.nbreOfGuests}{" "}
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    );
}

export default PostsCard;
