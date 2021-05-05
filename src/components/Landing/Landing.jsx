// Module Imports
import React from "react";
import { Container, Grid, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// File Imports
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Container>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={8}>
            <Box mt={18}>
              <Typography variant='h2' className={classes.heading}>
                Developer Camper
              </Typography>
              <Typography variant='h5' className={classes.description}>
                Create a publisher or a user account, a user can checkout for
                courses which were uploaded by verified publishers.
              </Typography>
              <Box mt={5}>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={3}
                >
                  <Grid item>
                    <Button
                      component={Link}
                      to='/register'
                      variant='contained'
                      color='primary'
                      size='large'
                    >
                      Sign up
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size='large'
                      component={Link}
                      to='/login'
                      variant='outlined'
                      className={classes.loginButton}
                    >
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Landing;
