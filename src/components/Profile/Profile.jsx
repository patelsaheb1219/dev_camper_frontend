// Module Imports
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { getLoggedInUser } from "../../redux/actions/userActions";
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

// First Letter Capital
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Profile = (props) => {
  const { getLoggedInUser, pageLoading } = props;
  const [user, setUser] = useState(null);
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

  if (user) {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box mt={10} mb={10}>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              {`${capitalize(user.role)}'s Profile`}
            </Typography>
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='fname'
                    name='name'
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    autoFocus
                    value={user.name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={user.email}
                    // onChange={(e) => setEmail(e.target.value)}
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
                onClick={() => console.log(user)}
              >
                Update Details
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInUser: () => dispatch(getLoggedInUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
