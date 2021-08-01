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
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    const test = useSelector((state) => state.postReducer.test);
    const hostTest = useSelector((state) => state.hostingReducer.hostTest);

    return (
        <div>
            <NavBar />
            <FilterDropdown />
            {test || hostTest ? (
                <div>
                    {hostsByDestination.length === 0 &&
                    postsByCity.length === 0 ? (
                        <h2> No data was found</h2>
                    ) : hostsByDestination.length !== 0 &&
                      postsByCity.length === 0 ? (
                        <div>
                            {hostsByDestination.map((host) => (
                                <div key={host._id}>
                                    <HostDestinationItem host={host} />
                                </div>
                            ))}
                        </div>
                    ) : hostsByDestination.length === 0 &&
                      postsByCity.length !== 0 ? (
                        <div>
                            {postsByCity.map((host) => (
                                <div key={host._id}>
                                    <HostCityItem host={host} />
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            )}
        </div>
    );
}
export default HostsList;
