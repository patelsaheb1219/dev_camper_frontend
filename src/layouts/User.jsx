// Module Imports
import React from "react";
import { Switch, Route } from "react-router-dom";

// Component Imports
import UserNavbar from "../components/generic/UserNavbar";
import Home from "../components/Home";
import Profile from "../components/Profile";

const User = () => {
  return (
    <React.Fragment>
      <UserNavbar />
      <div>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default User;
