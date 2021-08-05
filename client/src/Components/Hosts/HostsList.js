import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { userId, getToken } from "../../utils";
import { useDispatch } from "react-redux";
import {
    getHostsByCity,
    getHostsByDestination,
    getHostsByCheckIn,
} from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import HostDestinationItem from "./HostDestinationItem";
import HostCityItem from "./HostCityItem";
import FilterDropdown from "./FilterDropdown";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./HostsList.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

function HostsList() {
    const classes = useStyles();
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    let residence = sessionStorage.getItem("residence");
    let city = sessionStorage.getItem("city");
    let check_in = sessionStorage.getItem("check_in");
    useEffect(() => {
        if (city && check_in === null && residence === null) {
            dispatch(getHostsByCity({ city, id, token }));
        } else if (residence && check_in === null && city === null) {
            dispatch(getHostsByDestination({ residence, id, token }));
        } else if (check_in && residence && city === null) {
            dispatch(getHostsByCheckIn({ residence, check_in, id, token }));
        }
    }, [id, token, residence, city, dispatch]);
    const hostsByDestination = useSelector(
        (state) => state.hostingReducer.hostsByDestination
    );
    const postsByCity = useSelector((state) => state.postReducer.postsByCity);
    const hostsByDate = useSelector(
        (state) => state.hostingReducer.hostsByCheckIn
    );
    const test = useSelector((state) => state.postReducer.test);
    const hostTest = useSelector((state) => state.hostingReducer.hostTest);

    return (
        <div className="wl-hostsList-page">
            <NavBar />
            <div className="wl-hostsList-container">
                {test || hostTest ? (
                    <div className="wl-hostsList-body">
                        <FilterDropdown />
                        {hostsByDestination.length === 0 &&
                        postsByCity.length === 0 &&
                        hostsByDate.length === 0 ? (
                            <h2> No data was found</h2>
                        ) : hostsByDestination.length !== 0 &&
                          postsByCity.length === 0 ? (
                            <div className="wl-hostsList-item">
                                {hostsByDestination
                                    .map((host) => (
                                        <div key={host._id}>
                                            <HostDestinationItem host={host} />
                                        </div>
                                    ))
                                    .reverse()}
                            </div>
                        ) : hostsByDestination.length === 0 &&
                          hostsByDate.length === 0 &&
                          postsByCity.length !== 0 ? (
                            <div className="wl-hostsList-item">
                                {postsByCity
                                    .map((host) => (
                                        <div key={host._id}>
                                            <HostDestinationItem host={host} />
                                        </div>
                                    ))
                                    .reverse()}
                            </div>
                        ) : hostsByDestination.length === 0 &&
                          postsByCity.length === 0 &&
                          hostsByDate.length !== 0 ? (
                            <div className="wl-hostsList-item">
                                {hostsByDate
                                    .map((host) => (
                                        <div key={host._id}>
                                            <HostDestinationItem host={host} />
                                        </div>
                                    ))
                                    .reverse()}
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className={classes.root}>
                        <LinearProgress />
                    </div>
                )}
            </div>
        </div>
    );
}
export default HostsList;
