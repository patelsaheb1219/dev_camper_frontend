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
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { userLogin } from "../../redux/actions/userActions";
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Login = (props) => {
  const { userLogin, buttonLoading } = props;
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box mb={5}>
        <div className={classes.paper}>
          <img src='icon.png' className={classes.logoImage} alt={'Icon'} />
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <div className={classes.form}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => userLogin({ email, password }, history)}
              disabled={buttonLoading}
            >
              {
                buttonLoading ? (
                  <CircularProgress size={25} />
                ) : 'Sign In'
              }
              
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/forgotpassword' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    buttonLoading: state.user.buttonLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (userInfo, history) => dispatch(userLogin(userInfo, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
