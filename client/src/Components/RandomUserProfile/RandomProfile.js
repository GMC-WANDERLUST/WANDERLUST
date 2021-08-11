import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
    getRandomUserProfile,
    getRandomUserPosts,
    addPost,
} from "../../redux/actions/userActions";
import { getRandomUserHosts } from "../../redux/actions/hostActions";
import { userId, getToken } from "../../utils";
import ModalEditPhoto from "../UserProfil/ModalEditPhoto";
import "../UserProfil/UserProfile.css";
import RandomPostItem from "./RandomPostItem";
import RandomHostItem from "./RandomHostItem";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import { FaMapMarkerAlt, FaSuitcase, FaPhoneAlt } from "react-icons/fa";
import { RiCake2Fill } from "react-icons/ri";
import { IoLanguage, IoPeople, IoSchool, IoFootball } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";

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
    small: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

function RandomProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [valueStar, setValueStar] = React.useState(0);
    const [verifyId, setVerifyId] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("value star", valueStar);
    console.log("verify Id", verifyId);
    let id = userId();
    let rId = sessionStorage.getItem("randomId");
    let token = getToken();
    const dispatch = useDispatch();
    const [showPost, setShowPost] = useState(false);
    const [showHosts, setShowHosts] = useState(false);
    useEffect(() => {
        dispatch(getRandomUserProfile({ rId, token }));
        dispatch(getRandomUserPosts({ rId, token }));
        dispatch(getRandomUserHosts({ rId, token }));
    }, [id, token, dispatch]);
    const randomUser = useSelector((state) => state.userReducer.randomUser);
    const test = useSelector((state) => state.userReducer.test);
    const userPost = useSelector((state) => state.postReducer.randomUserPosts);
    const userHosts = useSelector(
        (state) => state.hostingReducer.randomUserHost
    );
    const handleRateChange = (event, newValue) => {
        setValueStar(newValue);
        setVerifyId(id);
    };
    return (
        <React.Fragment>
            <NavBar />
            {test ? (
                <div key={randomUser._id}>
                    <div className="wl-newUserProfile-container">
                        <div className="wl-newUserProfile-leftBox">
                            <div className="wl-user-photoBox">
                                <a href={randomUser.photo}>
                                    <Avatar
                                        alt="Profile_Photo"
                                        src={randomUser.photo}
                                        className={classes.large}
                                    />
                                </a>
                            </div>
                            <div className="wl-user-photoBox-responsive">
                                <a href={randomUser.photo}>
                                    <Avatar
                                        alt="Profile_Photo"
                                        src={randomUser.photo}
                                        className={classes.small}
                                    />
                                </a>
                                <ModalEditPhoto data={randomUser.photo} />
                            </div>

                            <div className="wl-user-infos">
                                <h5>About</h5>
                                <div className="wl-leftInfos-item">
                                    <IoLanguage size="18px" color="grey" />
                                    <h5>Languages:</h5>
                                    <h6> {randomUser.Languages}</h6>
                                </div>
                                <div className="wl-leftInfos-item">
                                    <IoPeople size="18px" color="grey" />
                                    <h5>Gender:</h5>{" "}
                                    <h6>{randomUser.Gender}</h6>
                                </div>
                                <div className="wl-leftInfos-item">
                                    <FaPhoneAlt size="18px" color="grey" />
                                    <h5>Phone:</h5>
                                    <h6>{randomUser.PhoneNumber}</h6>
                                </div>
                                <div className="wl-leftInfos-item">
                                    <BiWorld size="18px" color="grey" />
                                    <h5>Visited countries:</h5>
                                    <h6>{randomUser.CountriesIvisited}</h6>
                                </div>
                                <div className="wl-leftInfos-item">
                                    <IoSchool size="23px" color="grey" />
                                    <h5>Education:</h5>
                                    <h6>{randomUser.Education}</h6>
                                </div>
                                <div className="wl-leftInfos-item">
                                    <IoFootball size="18px" color="grey" />
                                    <h5>Hobbies:</h5>
                                    <h6> {randomUser.Hobbies} </h6>
                                </div>
                            </div>
                            <div className="wl-user-infos">
                                <h5>About me</h5>
                                <h6> {randomUser.AboutMe} </h6>
                            </div>
                        </div>
                        <div className="wl-newUserProfile-rightBox">
                            <div className="wl-NameAndSomeIformations">
                                <div className="firstName-lastName">
                                    <div className="firstName-box">
                                        <h1>{randomUser.FirstName}</h1>
                                    </div>
                                    <div className="lastName-box">
                                        <h1>{randomUser.LastName}</h1>
                                    </div>
                                </div>
                                <div className="wl-country-birthday-occupation">
                                    <div className="wl-info-element">
                                        <FaMapMarkerAlt
                                            size="20px"
                                            color="grey"
                                        />
                                        <h3>{randomUser.Country}</h3>
                                    </div>
                                    <div className="wl-info-element">
                                        <RiCake2Fill size="20px" color="grey" />
                                        <h3>{randomUser.DayOfBirth}</h3>
                                        <h3>{randomUser.MonthOfBirth}</h3>
                                        <h3>{randomUser.YearOfBirth}</h3>
                                    </div>
                                    <div className="wl-info-element">
                                        <FaSuitcase size="20px" color="grey" />
                                        <h3>{randomUser.Occupation} </h3>
                                    </div>
                                    {/* {verifyId === id ? (
                                        <div>
                                            <Box
                                                component="fieldset"
                                                mb={3}
                                                borderColor="transparent"
                                            >
                                                <Typography component="legend">
                                                    Ranking
                                                </Typography>
                                                <Rating
                                                    name="read-only"
                                                    value={valueStar}
                                                    readOnly
                                                />
                                            </Box>
                                        </div>
                                    ) : (
                                        <div
                                            className={
                                                verifyId ? "wl-hide-rate" : null
                                            }
                                        >
                                            <Box
                                                component="fieldset"
                                                mb={3}
                                                borderColor="transparent"
                                            >
                                                <Typography component="legend">
                                                    Rate
                                                </Typography>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={valueStar}
                                                    onChange={handleRateChange}
                                                    // onClick={setRateRanking}
                                                />
                                            </Box>
                                        </div>
                                    )} */}

                                    {/* <Box
                                        component="fieldset"
                                        mb={3}
                                        borderColor="transparent"
                                    >
                                        <Typography component="legend">
                                            Ranking
                                        </Typography>
                                        <Rating
                                            name="read-only"
                                            value={valueStar}
                                            readOnly
                                        />
                                    </Box> */}
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
                                                label="Posts"
                                                href="/drafts"
                                                {...a11yProps(0)}
                                            />
                                            <LinkTab
                                                label="Hosting Posts"
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
                                                    <RandomPostItem
                                                        post={post}
                                                    />
                                                </div>
                                            ))}
                                        </article>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <article>
                                            {userHosts.map((host) => (
                                                <div key={host._id}>
                                                    <RandomHostItem
                                                        host={host}
                                                    />
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

export default RandomProfile;
