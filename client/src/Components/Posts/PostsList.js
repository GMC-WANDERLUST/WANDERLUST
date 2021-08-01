import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { userId, getToken } from "../../utils";
import { useDispatch } from "react-redux";
import {
    getPostsByDestination,
    getPostsByCity,
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
    console.log("city", city);
    // console.log(destination)
    useEffect(() => {
        if (city) {
            dispatch(getPostsByCity({ city, id, token }));
        } else if (destination) {
            dispatch(getPostsByDestination({ destination, id, token }));
        }
    }, [id, token, destination, city, dispatch]);
    const postsByDestination = useSelector(
        (state) => state.postReducer.postsByDestination
    );
    const postsByCity = useSelector((state) => state.postReducer.postsByCity);
    const test = useSelector((state) => state.postReducer.test);

    return (
        <div>
            <NavBar />
            <FilterDropdown />
            {test ? (
                <div>
                    {postsByDestination.length === 0 &&
                    postsByCity.length === 0 ? (
                        <h2> No data was found</h2>
                    ) : postsByDestination.length !== 0 &&
                      postsByCity.length === 0 ? (
                        <div>
                            {postsByDestination.map((post) => (
                                <div key={post._id}>
                                    <PostDestinationItem post={post} />
                                </div>
                            ))}
                        </div>
                    ) : postsByDestination.length === 0 &&
                      postsByCity.length !== 0 ? (
                        <div>
                            {postsByCity.map((post) => (
                                <div key={post._id}>
                                    <PostCityItem post={post} />
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
export default PostList;
