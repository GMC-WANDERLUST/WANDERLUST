import React, { useEffect } from "react";
import HostsCard from "./HostsCard";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetHosts } from "../../../redux/actions/adminActions";
import { Button, ListGroup } from "react-bootstrap";

function AdminHostsList() {
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(adminGetHosts({ id, token }));
    }, [id, token, dispatch]);
    const hostsList = useSelector((state) => state.adminReducer.adminHostsList);
    return (
        <div>
            {/* <Button variant="outline-primary" href={`/adminUi/${id}`}>
                Back
            </Button> */}
            <h1>Hosts List</h1>
            {hostsList.map((host) => (
                <div key={host._id}>
                    <HostsCard host={host} />
                </div>
            ))}
        </div>
    );
}

export default AdminHostsList;
