import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, userId } from "../../utils";

function PrvRoute({ component: Component, restricted, ...rest }) {
    let id = userId();
    return (
        <Route
            {...rest}
            render={(routeData) => {
                if (isLoggedIn() && restricted) {
                    return <Redirect to={`/profile/${id}`} />;
                } else {
                    return <Component {...rest} {...routeData} />;
                }
            }}
        />
    );
}

export default PrvRoute;
