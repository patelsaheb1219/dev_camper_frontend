// Module Imports
import React from "react";
import { Switch, Route } from "react-router-dom";

// Component Imports
import Landing from "../components/Landing";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import AnonNavbar from "../components/generic/AnonNavbar";

const Anon = () => {
  return (
    <React.Fragment>
      <AnonNavbar />
      <Route exact path='/' component={Landing} />
      <div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Anon;
