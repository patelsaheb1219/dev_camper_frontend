// Module Imports
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, AppBar, Toolbar, Link } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    "&:hover": {
      textDecoration: "none",
    },
    cursor: "pointer",
  },
  linkText: {
    color: "white",
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    paddingLeft: 10,
    "&:hover": {
      textDecoration: "none",
    },
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
            <Link href={"/"} variant='h6' className={classes.title}>
              DevCamper
            </Link>
            {pathname !== "/login" ? (
              <Link href='/login' className={classes.linkText}>
                Login
              </Link>
            ) : null}
            {pathname !== "/register" ? (
              <Link href='/register' className={classes.linkText}>
                Register
              </Link>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AnonNavbar;
