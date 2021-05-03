import React from "react";
import { connect } from "react-redux";
import { userLogin } from "../../redux/actions/userActions";

const Login = () => {
  return (
    <div>
      Login component
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.user.authToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (email, password) => dispatch(userLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
