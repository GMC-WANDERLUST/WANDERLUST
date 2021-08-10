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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import { FaMapMarkerAlt, FaSuitcase, FaPhoneAlt } from "react-icons/fa";
import { RiCake2Fill, RiFileAddFill } from "react-icons/ri";
import { IoLanguage, IoPeople, IoSchool, IoFootball } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
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
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

// function LinkTab(props) {
//     return (
//         <Tab
//             component="a"
//             onClick={(event) => {
//                 event.preventDefault();
//             }}
//             {...props}
//         />
//     );
// }

const useStyles = makeStyles((theme) => ({
    rootProgress: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
    large: {
        width: theme.spacing(35),
        height: theme.spacing(35),
    },
}));

function UserProfile() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
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
    // const handleMyPosts = () => {
    //     setShowPost(!showPost);
    // };
    // const handleMyHosts = () => {
    //     setShowHosts(!showHosts);
    // };
    return (
        <React.Fragment>
            <NavBar />
            <div className="background">
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
                                    <div className="wl-leftInfos-item">
                                        <IoLanguage size="18px" color="grey" />
                                        <h5>Languages:</h5>
                                        <h6> {user.Languages}</h6>
                                    </div>
                                    <div className="wl-leftInfos-item">
                                        <IoPeople size="18px" color="grey" />
                                        <h5>Gender:</h5> <h6>{user.Gender}</h6>
                                    </div>
                                    <div className="wl-leftInfos-item">
                                        <FaPhoneAlt size="18px" color="grey" />
                                        <h5>Phone:</h5>
                                        <h6>{user.PhoneNumber}</h6>
                                    </div>
                                    <div className="wl-leftInfos-item">
                                        <BiWorld size="18px" color="grey" />
                                        <h5>Visited countries:</h5>
                                        <h6>{user.CountriesIvisited}</h6>
                                    </div>
                                    <div className="wl-leftInfos-item">
                                        <IoSchool size="27px" color="grey" />
                                        <h5>Education:</h5>
                                        <h6>{user.Education}</h6>
                                    </div>
                                    <div className="wl-leftInfos-item">
                                        <IoFootball size="18px" color="grey" />
                                        <h5>Hobbies:</h5>
                                        <h6> {user.Hobbies} </h6>
                                    </div>
                                </div>
                                <div className="wl-user-infos">
                                    <h5>About me</h5>
                                    <h6> {user.AboutMe} </h6>
                                </div>
                            </div>
                            <div className="wl-newUserProfile-rightBox">
                                <div className="wl-NameAndSomeIformations">
                                    <div
                                        className="wl-add-post"
                                        title="Add post"
                                    >
                                        <label className="btn-add-post">
                                            <input
                                                type="radio"
                                                value="Add Post"
                                                className="wl-input-add-post"
                                                onClick={openPostModal}
                                            />
                                            <RiFileAddFill
                                                size="40px"
                                                // color="#f2e6e6"
                                            />
                                        </label>
                                        <ModalAddPost />
                                    </div>
                                    <div className="firstName-lastName">
                                        <div className="modal-firstName">
                                            <ModalEditFirstName
                                                data={user.FirstName}
                                            />
                                        </div>
                                        <div className="firstName-box">
                                            <h1>{user.FirstName}</h1>
                                        </div>
                                        <ModalEditLastName
                                            data={user.LastName}
                                        />
                                        <div className="lastName-box">
                                            <h1>{user.LastName}</h1>
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
                                            <RiCake2Fill
                                                size="20px"
                                                color="grey"
                                            />
                                            <h3>{user.MonthOfBirth}</h3>
                                            <h3>{user.DayOfBirth},</h3>
                                            <h3>{user.YearOfBirth}</h3>
                                        </div>
                                        <div className="wl-info-element">
                                            <FaSuitcase
                                                size="20px"
                                                color="grey"
                                            />
                                            <h3>{user.Occupation} </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="PostsAndHosts">
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                            aria-label="full width tabs example"
                                        >
                                            <Tab
                                                label="My Posts"
                                                {...a11yProps(0)}
                                            />
                                            <Tab
                                                label="My Hosts"
                                                {...a11yProps(1)}
                                            />
                                            <Tab
                                                label="Review"
                                                {...a11yProps(2)}
                                            />
                                        </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                        axis={
                                            theme.direction === "rtl"
                                                ? "x-reverse"
                                                : "x"
                                        }
                                        index={value}
                                        onChangeIndex={handleChangeIndex}
                                    >
                                        <TabPanel
                                            value={value}
                                            index={0}
                                            dir={theme.direction}
                                        >
                                            <article className="wl-profile-postsLists">
                                                {userPost
                                                    .map((post) => (
                                                        <div key={post._id}>
                                                            <PostItem
                                                                post={post}
                                                            />
                                                        </div>
                                                    ))
                                                    .reverse()}
                                            </article>
                                        </TabPanel>
                                        <TabPanel
                                            value={value}
                                            index={1}
                                            dir={theme.direction}
                                        >
                                            <article className="wl-profile-hostPostsLists">
                                                {userHosts
                                                    .map((host) => (
                                                        <div key={host._id}>
                                                            <HostItem
                                                                host={host}
                                                            />
                                                        </div>
                                                    ))
                                                    .reverse()}
                                            </article>
                                        </TabPanel>
                                        <TabPanel
                                            value={value}
                                            index={2}
                                            dir={theme.direction}
                                        >
                                            REVIEWS
                                        </TabPanel>
                                    </SwipeableViews>
                                    {/* <AppBar color="default" position="static">
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
                                    <div className="PostsAndHostsAndReview">
                                        <TabPanel value={value} index={0}>
                                            <article className="wl-profile-postsLists">
                                                {userPost
                                                    .map((post) => (
                                                        <div key={post._id}>
                                                            <PostItem
                                                                post={post}
                                                            />
                                                        </div>
                                                    ))
                                                    .reverse()}
                                            </article>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <article className="wl-profile-hostPostsLists">
                                                {userHosts
                                                    .map((host) => (
                                                        <div key={host._id}>
                                                            <HostItem
                                                                host={host}
                                                            />
                                                        </div>
                                                    ))
                                                    .reverse()}
                                            </article>
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            REVIEWS
                                        </TabPanel>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={classes.rootProgress}>
                        <LinearProgress />
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default UserProfile;
