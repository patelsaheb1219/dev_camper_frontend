// Module Imports
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// Action Imports
import { setUserToken } from "./redux/actions/userActions";

// Root Component Import
import Root from './layouts/Root';

// Redux Store Import
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2076D2",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

const checkUserLoggedIn = async () => {
  const authToken = localStorage.getItem("authToken");
  const pathName = window.location.pathname;
  console.log('auth', authToken, pathName);
  console.log('res', (pathName !== "/login" ||
  pathName !== "/register" ||
  pathName !== "/" ||
  pathName !== "/forgotpassword") &&
  authToken === null)
  if (
    (pathName !== "/login" &&
    pathName !== "/register" &&
    pathName !== "/" &&
    pathName !== "/forgotpassword") &&
    authToken === null
  ) {
    console.log('here');
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
        <Root />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
