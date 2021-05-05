// Module Imports
import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box mb={5}>
        <div className={classes.paper}>
          <img src='icon.png' className={classes.logoImage} alt={"Icon"} />
          <Typography component='h1' variant='h5'>
            Forgot Password
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => console.log(email)}
            >
              Submit
            </Button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
