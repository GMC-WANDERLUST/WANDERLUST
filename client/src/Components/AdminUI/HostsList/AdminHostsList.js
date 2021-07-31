import React, { useEffect } from "react";
import CardHost from "./CardHost";
import { userId, getToken } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { adminGetHosts } from "../../../redux/actions/adminActions";

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
                    <CardHost host={host} />
                </div>
            ))}
        </div>
    );
}

export default AdminHostsList;
