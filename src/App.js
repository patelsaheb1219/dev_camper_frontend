// Module Imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// Component Imports
import Navbar from "./components/common/Navbar";
import Footer from './components/common/Footer';
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Landing from "./components/Landing";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

// Action Imports
import { setUserToken } from "./redux/actions/userActions";

// Redux Store Import
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2076D2",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const checkUserLoggedIn = async () => {
  const authToken = localStorage.getItem("authToken");
  const pathName = window.location.pathname;
  console.log('auth', authToken);
  if (
    (pathName !== "/login" &&
    pathName !== "/register" &&
    pathName !== "/" && 
    pathName !== "/forgotpassword") ||
    authToken === "null"
  ) {
    console.log("here");
    window.location.href = "/login";
  }
  await store.dispatch(setUserToken(authToken));
};

const App = () => {
  // dev_camper_api published APIs => https://documenter.getpostman.com/view/4496307/TzRLkW9k
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar />
        <Router>
          <Route exact path='/' component={Landing} />
          <div>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/forgotpassword' component={ForgotPassword} />
            </Switch>
            <Switch>
              <PrivateRoute path='/home' component={Home} />
            </Switch>
            <Switch>
              <PrivateRoute path='/profile' component={Profile} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
