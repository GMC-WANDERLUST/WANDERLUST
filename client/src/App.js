import "./App.css";
import { Switch, Route } from "react-router-dom";
import LogInSide from "./Components/Login/LogInSide";
import SignUp from "./Components/Register/SignUp";
import Home from "./Components/Home/Home";
import UserAddInformations from "./Components/UserProfil/UserAddInformations";
//import FirstPage from "./Components/FirstPage/FirstPage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import AdminRoute from "./Components/PrivateRoute/AdminRoute";
import AddProfilePhoto from "./Components/UserProfil/AddProfilePhoto";
import UserProfile from "./Components/UserProfil/UserProfile";
import UserUpdateProfile from "./Components/UserProfil/UserUpdateProfile";
import PostsList from "./Components/Posts/PostsList";
import HostsList from "./Components/Hosts/HostsList";
import WrongPath from "./Components/WrongPath/WrongPath";
import Admin from "./Components/AdminUI/Admin";
import UsersList from "./Components/AdminUI/UsersList/UsersList";
import UserPostsList from "./Components/AdminUI/PostsList/UsersPostsList";
import AdminHostsList from "./Components/AdminUI/HostsList/AdminHostsList";
import RandomProfile from "./Components/RandomUserProfile/RandomProfile";
import LandingPage from "./Components/LandingPage/LandingPage";
import ReportedHostsList from "./Components/AdminUI/ReportedHostsList/ReportedHostsList";
import ReportedPostsList from "./Components/AdminUI/ReportedPostsList/ReportedPostsList";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route
                    restricted={true}
                    exact
                    path="/"
                    component={LandingPage}
                />
                <PublicRoute
                    restricted={true}
                    path="/register"
                    component={SignUp}
                />
                <PublicRoute
                    restricted={true}
                    path="/login"
                    component={LogInSide}
                />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/wrong" component={WrongPath} />
                <PrivateRoute
                    path="/addprofilephoto/:id"
                    component={AddProfilePhoto}
                />
                <PrivateRoute
                    path="/editprofile/:id"
                    component={UserAddInformations}
                />
                <PrivateRoute
                    path="/updateprofile/:id"
                    component={UserUpdateProfile}
                />
                <PrivateRoute path="/profile/:id" component={UserProfile} />
                <PrivateRoute path="/uprofile/:id" component={RandomProfile} />
                <PrivateRoute path="/postsList" component={PostsList} />
                <PrivateRoute path="/hostsList" component={HostsList} />
                <AdminRoute
                    exact
                    path="/adminUi/:id"
                    restricted={true}
                    component={Admin}
                />
                <AdminRoute
                    path="/adminUi/admin/usersList"
                    restricted={true}
                    component={UsersList}
                />
                <AdminRoute
                    path="/adminUi/admin/allPosts"
                    restricted={true}
                    component={UserPostsList}
                />
                <AdminRoute
                    path="/adminUi/admin/allHosts"
                    restricted={true}
                    component={AdminHostsList}
                />
                <AdminRoute
                    path="/adminUi/admin/allReportedHosts"
                    restricted={true}
                    component={ReportedHostsList}
                />
                <AdminRoute
                    path="/adminUi/admin/allReportedPosts"
                    restricted={true}
                    component={ReportedPostsList}
                />
            </Switch>
        </div>
    );
}

export default App;
