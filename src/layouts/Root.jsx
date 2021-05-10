// Module Imports
import React from "react";
import { Box } from '@material-ui/core';
import { connect } from "react-redux";

// Component Imports
import Footer from "../components/generic/Footer";
import User from "./User";
import Anon from "./Anon";

const Root = (props) => {
  const { authToken } = props;
  return (
    <React.Fragment>
      <Box style={{ minHeight: '100vh' }}>{authToken ? <User /> : <Anon />}</Box>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.user.authToken,
  };
};

export default connect(mapStateToProps, null)(Root);
