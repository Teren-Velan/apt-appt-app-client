import React from "react";
import { Redirect, Route } from "react-router-dom";
/**
 *
 *
 */
function PrivateRoute({ isAuth, component: Component, ...rest }) {
  console.log("isAuth", isAuth);
  return (
    <Route {...rest}>
      {isAuth ? <Component {...rest} /> : <Redirect to="/login" />}
    </Route>
  );
}

export default PrivateRoute;
