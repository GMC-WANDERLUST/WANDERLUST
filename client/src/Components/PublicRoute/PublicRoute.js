import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../utils";

function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        <Route
            {...rest}
            render={(routeData) => {
                if (isLoggedIn() && restricted) {
                    return <Component {...rest} {...routeData} />;
                } else {
                    <Redirect to="/" />;
                    return;
                }
            }}
        />
    );
}

export default PublicRoute;
