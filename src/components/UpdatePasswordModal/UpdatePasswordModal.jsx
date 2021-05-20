// Module Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  OutlinedInput,
  Button,
  CircularProgress,
  Grid
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// File Imports
import { styleRules } from "./styles";

// Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const UpdatePassword = (props) => {
  const { open, onClose, buttonText, buttonLoading, updateUserPassword } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const classes = useStyles();

  const updateField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const closeModal = async () => {
    await setCurrentPassword("");
    await setNewPassword("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>
        <Typography variant='h6'>Update Password</Typography>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item>
            <Box m={1}>
              <OutlinedInput
                type="password"
                name='currentPassword'
                placeholder='Current Password'
                onChange={(e) => updateField(e)}
                value={currentPassword}
                fullWidth
                margin={"dense"}
                autoFocus
              />
            </Box>
          </Grid>

          <Grid item>
            <Box m={1}>
              <OutlinedInput
                type="password"
                name='newPassword'
                placeholder='New Password'
                onChange={(e) => updateField(e)}
                value={newPassword}
                fullWidth
                margin={"dense"}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await updateUserPassword({ currentPassword, newPassword })
            await closeModal();
          }}
          color='primary'
          variant={"outlined"}
          disabled={buttonLoading}
        >
          {buttonLoading ? <CircularProgress size={25} /> : buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    buttonLoading: state.user.buttonLoading,
  }
}

export default connect(mapStateToProps, null)(UpdatePassword);
