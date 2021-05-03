// Module Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

// Component Imports
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

// Redux Store Import
import store from "./redux/store";

const App = () => {
  // dev_camper_api published APIs => https://documenter.getpostman.com/view/4496307/TzRLkW9k
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <div>
          <Switch>
            <Route exact path='/login' component={Login} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/profile' component={Profile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
