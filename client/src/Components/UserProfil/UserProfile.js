import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserProfile,
    getUserPosts,
    addPost,
} from "../../redux/actions/userActions";
import { getUserHosts } from "../../redux/actions/hostActions";
import { userId, getToken } from "../../utils";
import ModalEditFirstName from "./ModalEditFirstName";
import ModalEditLastName from "./ModalEditLastName";
import ModalEditPhoto from "./ModalEditPhoto";
import ModalAddPost from "./ModalAddPost";
import "./UserProfile.css";
import PostItem from "./PostItem";
import HostItem from "./HostItem";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import { FaMapMarkerAlt, FaSuitcase } from "react-icons/fa";
import { RiCake2Fill, RiFileAddFill } from "react-icons/ri";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

////////////////FUNCTIONS//////////////////////////////////////
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    rootProgress: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    large: {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
}));

function UserProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let id = userId();
    let token = getToken();
    const dispatch = useDispatch();
    const [showPost, setShowPost] = useState(false);
    const [showHosts, setShowHosts] = useState(false);
    useEffect(() => {
        dispatch(getUserProfile({ id, token }));
        dispatch(getUserPosts({ id, token }));
        dispatch(getUserHosts({ id, token }));
    }, [id, token, dispatch]);
    const user = useSelector((state) => state.userReducer.user);
    const userPost = useSelector((state) => state.postReducer.userPosts);
    const userHosts = useSelector((state) => state.hostingReducer.userHosts);
    const test = useSelector((state) => state.userReducer.test);
    const openPostModal = () => {
        dispatch(addPost());
    };
    const handleMyPosts = () => {
        setShowPost(!showPost);
    };
    const handleMyHosts = () => {
        setShowHosts(!showHosts);
    };
    return (
        <React.Fragment>
            <NavBar />

            {test ? (
                <div key={user._id}>
                    <div className="wl-newUserProfile-container">
                        <div className="wl-newUserProfile-leftBox">
                            <div className="wl-user-photoBox">
                                <a href={user.photo}>
                                    <Avatar
                                        alt="Profile_Photo"
                                        src={user.photo}
                                        className={classes.large}
                                    />
                                </a>

                                <ModalEditPhoto data={user.photo} />
                            </div>
                            <div className="wl-user-infos">
                                <h5>About</h5>
                                <h6>Languages :</h6>
                                <p> {user.Languages}</p>
                                <h6>Gender :</h6> <p>{user.Gender}</p>
                                <h6>Phone :</h6>
                                <p>{user.PhoneNumber}</p>
                                <h6>Visited countries :</h6>
                                <p> {user.CountriesIvisited} </p>
                                <h6>Education :</h6>
                                <p> {user.Education} </p>
                                <h6>Hobbies</h6>
                                <p> {user.Hobbies} </p>
                            </div>
                            <div className="wl-user-infos">
                                <h5>About me</h5>
                                <p> {user.AboutMe} </p>
                            </div>
                        </div>
                        <div className="wl-newUserProfile-rightBox">
                            <div className="wl-NameAndSomeIformations">
                                <div className="wl-add-post" title="Add post">
                                    <label>
                                        <RiFileAddFill
                                            size="40px"
                                            // color="#f2e6e6"
                                        />
                                        <input
                                            type="radio"
                                            value="Add Post"
                                            onClick={openPostModal}
                                        />
                                    </label>
                                    <ModalAddPost />
                                </div>
                                <div className="firstName-lastName">
                                    <div className="firstName-box">
                                        <h1>{user.FirstName}</h1>

                                        <ModalEditFirstName
                                            data={user.FirstName}
                                        />
                                    </div>
                                    <div className="lastName-box">
                                        <h1>{user.LastName}</h1>
                                        <ModalEditLastName
                                            data={user.LastName}
                                        />
                                    </div>
                                </div>
                                <div className="wl-country-birthday-occupation">
                                    <div className="wl-info-element">
                                        <FaMapMarkerAlt
                                            size="20px"
                                            color="grey"
                                        />
                                        <h3>{user.Country}</h3>
                                    </div>
                                    <div className="wl-info-element">
                                        <RiCake2Fill size="20px" color="grey" />
                                        <h3>{user.DayOfBirth}</h3>
                                        <h3>{user.MonthOfBirth}</h3>
                                        <h3>{user.YearOfBirth}</h3>
                                    </div>
                                    <div className="wl-info-element">
                                        <FaSuitcase size="20px" color="grey" />
                                        <h3>{user.Occupation} </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="PostsAndHosts">
                                <div className="postandhostNavBar">
                                    <AppBar color="default" position="static">
                                        <Tabs
                                            variant="fullWidth"
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="nav tabs example"
                                        >
                                            <LinkTab
                                                label="My Posts"
                                                href="/drafts"
                                                {...a11yProps(0)}
                                            />
                                            <LinkTab
                                                label="My Hosting Posts"
                                                href="/trash"
                                                {...a11yProps(1)}
                                            />
                                            <LinkTab
                                                label="Reviews"
                                                href="/spam"
                                                {...a11yProps(2)}
                                            />
                                        </Tabs>
                                    </AppBar>
                                </div>
                                <div className="PostsAndHostsAndReview">
                                    <TabPanel value={value} index={0}>
                                        <article>
                                            {userPost.map((post) => (
                                                <div key={post._id}>
                                                    <PostItem post={post} />
                                                </div>
                                            ))}
                                        </article>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <article>
                                            {userHosts.map((host) => (
                                                <div key={host._id}>
                                                    <HostItem host={host} />
                                                </div>
                                            ))}
                                        </article>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        REVIEWS
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.rootProgress}>
                    <LinearProgress />
                </div>
            )}
        </React.Fragment>
    );
}

export default UserProfile;
