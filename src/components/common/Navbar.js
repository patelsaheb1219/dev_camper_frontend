import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, AppBar, Toolbar, Button, Link } from "@material-ui/core";
import { connect } from "react-redux";

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

const Navbar = (props) => {
  const { authToken } = props;
  const classes = useStyles();
  const pathname = window.location.pathname;
  if (pathname === "/") {
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Link
                href={'/'}
                variant='h6'
                className={classes.title}
              >
                DevCamper
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }

  if (authToken && authToken !== undefined) {
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Link href={"/home"} variant='h6' className={classes.title}>
                DevCamper
              </Link>
              <Link href='/profile' className={classes.linkText}>
                Profile
              </Link>
              <Button color='inherit'>Logout</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }

  if (pathname === "/login" || pathname === "/register") {
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Link href={"/"} variant='h6' className={classes.title}>
                DevCamper
              </Link>
              {!authToken && pathname !== "/login" ? (
                <Link href='/login' className={classes.linkText}>
                  Login
                </Link>
              ) : null}
              {!authToken && pathname !== "/register" ? (
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
};

const mapStateToProps = (state) => {
  return {
    authToken: state.user.authToken,
  };
};

export default connect(mapStateToProps, null)(Navbar);
