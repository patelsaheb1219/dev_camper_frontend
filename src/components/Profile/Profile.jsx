// Module Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

// File Imports
import {
  updateUserDetails,
  updateUserPassword,
} from "../../redux/actions/userActions";
import { styleRules } from "./styles";
import User from "./User";
import UpdatePasswordModal from "../UpdatePasswordModal/UpdatePasswordModal";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Profile = (props) => {
  const {
    pageLoading,
    updateUserDetails,
    buttonLoading,
    userProfile,
    updateUserPassword,
  } = props;
  const classes = useStyles();
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
      <Container className={classes.textAlignment}>
        <Box m={10}>
          <CircularProgress />
        </Box>
      </Container>
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
