// Module Imports
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, AppBar, Toolbar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 700,
  },
  subtitle: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
    paddingRight: 20,
  },
  linkText: {
    color: "white",
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    paddingLeft: 10,
    cursor: "pointer",
    textDecoration: "none",
  },
}));

const AnonNavbar = () => {
  const classes = useStyles();
  const pathname = window.location.pathname;
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Grid container justify={"space-between"}>
              <Grid item>
                <Link to={"/"} variant='h6' className={classes.title}>
                  DevCamper
                </Link>
                <Link to={"/bootcamps"} variant='h6' className={classes.subtitle}>
                  Bootcamps
                </Link>
              </Grid>
              <Grid item>
                {pathname !== "/login" ? (
                  <Link to='/login' className={classes.linkText}>
                    Login
                  </Link>
                ) : null}
                {pathname !== "/register" ? (
                  <Link to='/register' className={classes.linkText}>
                    Register
                  </Link>
                ) : null}
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default AnonNavbar;
