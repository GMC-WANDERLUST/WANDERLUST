import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { userId, getToken } from "../../utils";
import { useDispatch } from "react-redux";
import {
    getPostsByDestination,
    getPostsByCity,
    getPostsByCheckIn,
} from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import PostDestinationItem from "./PostDestinationItem";
import PostCityItem from "./PostCityItem";
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

function PostList() {
    const classes = useStyles();

    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    let destination = sessionStorage.getItem("destination");
    let city = sessionStorage.getItem("city");
    let check_in = sessionStorage.getItem("check_in");
    useEffect(() => {
        if (city && check_in === null && destination === null) {
            dispatch(getPostsByCity({ city, id, token }));
        } else if (destination && check_in === null && city === null) {
            dispatch(getPostsByDestination({ destination, id, token }));
        } else if (check_in && destination && city === null) {
            dispatch(getPostsByCheckIn({ check_in, destination, id, token }));
        }
    }, [id, token, destination, city, dispatch]);
    const postsByDestination = useSelector(
        (state) => state.postReducer.postsByDestination
    );
    const postsByCity = useSelector((state) => state.postReducer.postsByCity);
    const postsByCheckIn = useSelector(
        (state) => state.postReducer.postsByCheckIn
    );
    const test = useSelector((state) => state.postReducer.test);

    return (
        <div>
            <NavBar />
            <FilterDropdown />
            {test ? (
                <div>
                    {postsByDestination.length === 0 &&
                    postsByCity.length === 0 &&
                    postsByCheckIn.length === 0 ? (
                        <h2> No data was found</h2>
                    ) : postsByDestination.length !== 0 &&
                      postsByCity.length === 0 &&
                      postsByCheckIn.length === 0 ? (
                        <div>
                            {postsByDestination
                                .map((post) => (
                                    <div key={post._id}>
                                        <PostDestinationItem post={post} />
                                    </div>
                                ))
                                .reverse()}
                        </div>
                    ) : postsByDestination.length === 0 &&
                      postsByCheckIn.length === 0 &&
                      postsByCity.length !== 0 ? (
                        <div>
                            {postsByCity
                                .map((post) => (
                                    <div key={post._id}>
                                        <PostCityItem post={post} />
                                    </div>
                                ))
                                .reverse()}
                        </div>
                    ) : postsByDestination.length === 0 &&
                      postsByCity.length === 0 &&
                          postsByCheckIn.length !== 0 ? (
                        <div>
                            {postsByCheckIn
                                .map((post) => (
                                    <div key={post._id}>
                                        <PostCityItem post={post} />
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
    );
}
export default PostList;
