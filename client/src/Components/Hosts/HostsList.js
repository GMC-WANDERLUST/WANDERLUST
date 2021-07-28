import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { userId, getToken } from "../../utils";
import { useDispatch } from "react-redux";
import {
    getHostsByCity,
    getHostsByDestination,
} from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import HostDestinationItem from "./HostDestinationItem";
import HostCityItem from "./HostCityItem";
import FilterDropdown from "./FilterDropdown";

function HostsList() {
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    let residence = sessionStorage.getItem("residence");
    let city = sessionStorage.getItem("city");
    console.log("city", city);
    // console.log(destination)
    useEffect(() => {
        if (city) {
            dispatch(getHostsByCity({ city, id, token }));
        } else if (residence) {
            dispatch(getHostsByDestination({ residence, id, token }));
        }
    }, [id, token, residence, city, dispatch]);
    const hostsByDestination = useSelector(
        (state) => state.hostingReducer.hostsByDestination
    );
    const postsByCity = useSelector((state) => state.postReducer.postsByCity);
    console.log(postsByCity);
    return (
        <div>
            <NavBar />
            <h1>This is the hosts List</h1>
            <FilterDropdown />
            {hostsByDestination.length === 0 && postsByCity.length === 0 ? (
                <h2> No data was found</h2>
            ) : hostsByDestination.length !== 0 && postsByCity.length === 0 ? (
                <div>
                    {hostsByDestination.map((host) => (
                        <div key={host._id}>
                            <HostDestinationItem host={host} />
                        </div>
                    ))}
                </div>
            ) : hostsByDestination.length === 0 && postsByCity.length !== 0 ? (
                <div>
                    {postsByCity.map((post) => (
                        <div key={post._id}>
                            <HostCityItem post={post} />
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
export default HostsList;
