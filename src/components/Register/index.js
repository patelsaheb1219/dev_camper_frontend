// Module Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Link,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";
import { userRegistration } from "../../redux/actions/userActions";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Register = (props) => {
  const { userRegistration } = props;
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Role function
  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box mb={5}>
        <div className={classes.paper}>
          <img src='icon.png' className={classes.logoImage} alt={'Icon'} />
          <Typography component='h1' variant='h5'>
            Sign up
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-label='quiz'
                  name='quiz'
                  value={role}
                  onChange={handleRadioChange}
                >
                  <Grid container direction='row' justify='flex-start'>
                    <Grid item>
                      <FormControlLabel
                        value='user'
                        control={<Radio color='primary' />}
                        label='User'
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value='publisher'
                        control={<Radio color='primary' />}
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
              onClick={() =>
                userRegistration(
                  {
                    name,
                    email,
                    password,
                  },
                  history
                )
              }
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRegistration: (userInfo, history) =>
      dispatch(userRegistration(userInfo, history)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
