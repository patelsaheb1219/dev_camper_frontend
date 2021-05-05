// Module Imports
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Component Imports
import PrivateRoute from "../components/generic/PrivateRoute";
import UserNavbar from "../components/generic/UserNavbar";
import Home from "../components/Home";
import Profile from "../components/Profile";

const User = () => {
  return (
    <React.Fragment>
      <UserNavbar />
      <Router>
        <div>
          <Switch>
            <PrivateRoute path='/home' component={Home} />
          </Switch>
          <Switch>
            <PrivateRoute path='/profile' component={Profile} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default User;
