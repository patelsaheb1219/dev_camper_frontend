// Module Imports
import React from "react";
import { connect } from "react-redux";

// Component Imports
import Footer from '../components/generic/Footer';
import User from './User';
import Anon from './Anon';

const Root = (props) => {
  const { authToken } = props;
  return (
    <React.Fragment>
      {
        authToken ? (
          <User />
        ) : (
          <Anon />
        )
      }
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.user.authToken
  }
}

export default connect(mapStateToProps, null)(Root);
