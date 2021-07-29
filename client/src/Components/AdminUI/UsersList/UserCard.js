import React from "react";
import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { GET_USER_HOSTS } from "../../../redux/constants/action-types";

function UserCard({ token, user, id }) {
    // const [banned, setBanned] = React.useState(false);
    // console.log(banned);
    // console.log("token", token);
    const handelBanUser = () => {
        if (user.isUser) {
            axios
                .put(
                    `/api/admin/bannedUser/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => console.dir(error));
        } else {
            axios
                .put(
                    `/api/admin/unbanedUser/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => console.dir(error));
        }
    };
    const handelAddAdmin = () => {
        if (user.isAdmin) {
            axios
                .put(
                    `/api/admin/removeAdmin/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.lcation.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .put(
                    `/api/admin/addAdmin/${id}`,
                    {},
                    {
                        headers: {
                            jwt: token,
                            data: user._id,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    window.lcation.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div>
            <Card style={{ width: "18rem" }}>
                <Card.Img
                    variant="top"
                    src={user.image}
                    width="10px"
                    height="320px"
                />
                <Card.Body>
                    <Card.Title>
                        {user.FirstName.toUpperCase()}{" "}
                        {user.LastName.toUpperCase()}
                    </Card.Title>
                </Card.Body>
                <Button
                    variant={user.isUser ? "danger" : "warning"}
                    onClick={handelBanUser}
                >
                    {user.isUser ? "Ban this user" : "Unban this user"}
                </Button>
                <Button
                    variant={
                        user.isAdmin ? "outline-secondary" : "outline-primary"
                    }
                    onClick={handelAddAdmin}
                >
                    {user.isAdmin ? "Remove" : "Add"}
                </Button>
            </Card>
        </div>
    );
}

export default UserCard;
