// Module Imports
import React, { useEffect, useState } from "react";
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
  OutlinedInput
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// File Imports
import { getLoggedInUser, updateUserDetails } from "../../redux/actions/userActions";
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

// First Letter Capital
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Profile = (props) => {
  const { getLoggedInUser, pageLoading, updateUserDetails, buttonLoading } = props;
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getLoggedInUser();
      setUser(res);
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageLoading) {
    return (
      <Container style={{ textAlign: "center" }}>
        <Box m={10}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const updateUser = async (e) => {
    setEdit(true);
    let updatedUser = user;
    updatedUser = { ...updatedUser, [e.target.name]: e.target.value }
    setUser(updatedUser);
  }

  if (user) {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box mt={10} mb={10}>
          <div className={classes.paper}>
            <AccountBoxIcon style={{ height: 100, width: 100 }} color="primary" />
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
                onClick={async () => {
                  await setEdit(false)
                  updateUserDetails(user)
                }}
                disabled={!edit || buttonLoading}
              >
                {
                  buttonLoading ? <CircularProgress size={25} /> : 'Update Details'
                }
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    );
  }

  return null;
};

const mapStateToProps = (state) => {
  return {
    pageLoading: state.user.pageLoading,
    buttonLoading: state.user.buttonLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInUser: () => dispatch(getLoggedInUser()),
    updateUserDetails: (userInfo) => dispatch(updateUserDetails(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
