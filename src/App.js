// Module Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// Component Imports
import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

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

const App = () => {
  // dev_camper_api published APIs => https://documenter.getpostman.com/view/4496307/TzRLkW9k
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <Navbar />
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
    </ThemeProvider>
  );
};

export default App;
