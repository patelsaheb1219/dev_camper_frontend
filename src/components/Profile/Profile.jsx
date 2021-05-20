// Module Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

// File Imports
import {
  updateUserDetails,
  updateUserPassword,
} from "../../redux/actions/userActions";
import User from "./User";
import UpdatePasswordModal from "../UpdatePasswordModal/UpdatePasswordModal";
import PageLoader from "../generic/PageLoader";

const Profile = (props) => {
  const {
    pageLoading,
    updateUserDetails,
    buttonLoading,
    userProfile,
    updateUserPassword,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [passwordModal, setPasswordModal] = useState(false);

  const fucUpdateUserPassword = async (password) => {
    try {
      await updateUserPassword(password);
      enqueueSnackbar("Password Updated Successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(
        JSON.stringify(err.response.data.error)
          .replace("[", "")
          .replace("]", ""),
        {
          variant: "error",
        }
      );
    }
  };

  const updatePasswordModal = () => {
    return (
      <UpdatePasswordModal
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
        buttonText={"Submit"}
        updateUserPassword={fucUpdateUserPassword}
      />
    );
  };

  if (pageLoading) {
    return (
      <PageLoader />
    );
  }

  return (
    <React.Fragment>
      {userProfile ? (
        <User
          updateUserDetails={updateUserDetails}
          userProfile={userProfile}
          buttonLoading={buttonLoading}
          setPasswordModal={setPasswordModal}
        />
      ) : null}
      {updatePasswordModal()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    pageLoading: state.user.pageLoading,
    buttonLoading: state.user.buttonLoading,
    userProfile: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (userInfo) => dispatch(updateUserDetails(userInfo)),
    updateUserPassword: (password) => dispatch(updateUserPassword(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
