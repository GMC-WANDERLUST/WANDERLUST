import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../../utils";

function AdminRoute({ component: Component, restricted, ...rest }) {
    console.log(isAdmin());
    return (
        <Route
            {...rest}
            render={(routeData) =>
                isLoggedIn() && isAdmin() && restricted ? (
                    <Component {...rest} {...routeData} />
                ) : (
                    <Redirect to="/wrong" />
                )
            }
        />
    );
}

export default AdminRoute;
