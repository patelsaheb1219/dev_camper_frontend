// Module Imports
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";

// Action Imports
import { setUserToken } from "./redux/actions/userActions";

// Root Component Import
import Root from "./layouts/Root";

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
    background: {
      default: "#fafafa",
    },
  },
});

const checkUserLoggedIn = async () => {
  const authToken = localStorage.getItem("authToken");
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
  await store.dispatch(setUserToken(authToken));
};

const App = () => {
  // dev_camper_api published APIs => https://documenter.getpostman.com/view/4496307/TzRLkW9k
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} hideIconVariant={false}>
        <Provider store={store}>
          <Root />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
