import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../utils";

function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        <Route
            {...rest}
            render={(routeData) => {
                if (isLoggedIn() && restricted) {
                    return <Redirect to="/wrong" />;
                } else {
                    return <Component {...rest} {...routeData} />;
                }
            }}
        />
    );
}

export default PublicRoute;
