// Module Imports
import React from "react";
import { connect } from "react-redux";

// Import Home Component
import PublisherHome from "../PublisherHome";
import AdminHome from "../AdminHome";
import UserHome from "../UserHome";

const Home = (props) => {
  const { user } = props;

  if (user && user.role === "admin") {
    return <AdminHome />;
  }

  if (user && user.role === "publisher") {
    return <PublisherHome />;
  }

  return <UserHome />;
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(Home);
