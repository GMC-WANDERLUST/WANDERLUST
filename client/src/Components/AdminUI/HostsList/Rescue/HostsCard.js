import React from "react";
import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { userId, getToken } from "../../../../utils";


function HostsCard({ host }) {
    let id = userId();
    let token = getToken();
    const handleDelete = () => {
        axios
            .delete(`/api/admin/deleteHost/${id}`, {
                headers: {
                    jwt: token,
                    data: host._id,
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
                <Card.Img variant="top" src={host.img} height="450px" />
                <Card.Body>
                    <Card.Title>
                        {host.firstName.toUpperCase()}{" "}
                        {host.lastName.toUpperCase()}
                    </Card.Title>
                    <Card.Text>{host.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        Residence :{host.residence.toUpperCase()}
                    </ListGroupItem>
                    <ListGroupItem>
                        City :{host.city.toUpperCase()}
                    </ListGroupItem>
                    <ListGroupItem>
                        Nombre of Rooms : {host.nbreOfRooms}
                    </ListGroupItem>
                    <ListGroupItem>
                        Nombre of Beds : {host.nbreOfBeds}
                    </ListGroupItem>
                    <ListGroupItem>
                        Price : {host.price} $
                    </ListGroupItem>
                </ListGroup>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Delete this host
                </Button>
            </Card>
        </div>
    );
}

export default HostsCard;
