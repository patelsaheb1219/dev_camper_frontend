// Module Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useSnackbar } from "notistack";

// File Imports
import { capitalize } from "../../utils/general";
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const User = (props) => {
  const { updateUserDetails, buttonLoading, userProfile, setPasswordModal } = props;
  const [user, setUser] = useState(userProfile);
  const [edit, setEdit] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const updateUser = async (e) => {
    setEdit(true);
    let updatedUser = user;
    updatedUser = { ...updatedUser, [e.target.name]: e.target.value };
    setUser(updatedUser);
  };

  // Call Update User API
  const updateExistingUser = async () => {
    try {
      await setEdit(false);
      await updateUserDetails(user);
      enqueueSnackbar("User Details Updated Successfully!", {
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

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        mt={10}
        mb={10}
        p={3}
        boxShadow={3}
        style={{ backgroundColor: "#fff" }}
      >
        <div className={classes.paper}>
          <AccountBoxIcon style={{ height: 100, width: 100 }} color='primary' />
          <Typography component='h1' variant='h5'>
            {`${capitalize(user.role)}'s Profile`}
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OutlinedInput
                  autoComplete='name'
                  name='name'
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  placeholder='Name'
                  autoFocus
                  value={user.name}
                  onChange={(e) => updateUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  placeholder='Email Address'
                  name='email'
                  autoComplete='email'
                  value={user.email}
                  onChange={(e) => updateUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-label='quiz'
                  name='quiz'
                  value={user.role}
                  // onChange={handleRadioChange}
                >
                  <Grid container direction='row' justify='flex-start'>
                    <Grid item>
                      <FormControlLabel
                        value='user'
                        control={<Radio color='primary' disabled />}
                        label='User'
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value='publisher'
                        control={<Radio color='primary' disabled />}
                        label='Publisher'
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={updateExistingUser}
              disabled={!edit || buttonLoading}
            >
              {buttonLoading ? (
                <CircularProgress size={25} />
              ) : (
                "Update Details"
              )}
            </Button>

            <Button
              fullWidth
              variant='contained'
              color='secondary'
              className={classes.submit}
              disabled={buttonLoading}
              onClick={() => setPasswordModal(true)}
            >
              Update Password
            </Button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    buttonLoading: state.user.buttonLoading,
  };
};

export default connect(mapStateToProps, null)(User);
