import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import UserEditProfil from "./Components/UserProfil/UserEditProfil";
import FirstPage from "./Components/FirstPage/FirstPage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AddProfilePhoto from "./Components/UserProfil/AddProfilePhoto";
import UserProfile from "./Components/UserProfil/UserProfile";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route restricted={true} exact path="/" component={FirstPage} />
                <Route
                    restricted={true}
                    path="/register"
                    component={Register}
                />
                <Route restricted={true} path="/login" component={Login} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute
                    path="/addprofilephoto/:id"
                    component={AddProfilePhoto}
                />
                <PrivateRoute
                    path="/editprofile/:id"
                    component={UserEditProfil}
                />
                <PrivateRoute path="/profile/:id" component={UserProfile} />
            </Switch>
        </div>
    );
}

export default App;
