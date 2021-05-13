// Module Imports
import React from "react";
import { Switch, Route } from "react-router-dom";

// Component Imports
import UserNavbar from "../components/generic/UserNavbar";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Bootcamps from "../components/Bootcamps";
import Bootcamp from "../components/Bootcamp";

const User = () => {
  return (
    <React.Fragment>
      <UserNavbar />
      <div>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path='/bootcamps' component={Bootcamps} />
          <Route path="/bootcamp" component={Bootcamp} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default User;
