// Module Imports
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";

// Action Imports
import { setUserToken, setUser } from "./redux/actions/userActions";

// Root Component Import
import Root from "./layouts/Root";

// Redux Store Import
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2076D2",
    },
    background: {
      default: "#fafafa",
    },
  },
});

const checkUserLoggedIn = async () => {
  const authToken = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");
  const pathName = window.location.pathname;
  if (
    pathName !== "/login" &&
    pathName !== "/register" &&
    pathName !== "/" &&
    pathName !== "/forgotpassword" &&
    authToken === null
  ) {
    window.location.href = "/login";
  }
  if (user) {
    await store.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }
  await store.dispatch(setUserToken(authToken));
};

const App = () => {
  // dev_camper_api published APIs => https://documenter.getpostman.com/view/4496307/TzRLkW9k
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
        >
          <Provider store={store}>
            <Root />
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
