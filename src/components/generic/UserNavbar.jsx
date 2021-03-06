// Module Imports
import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";

// File Import
import { userLoggedOut } from "../../redux/actions/userActions";

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
    textDecoration: "none",
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
    paddingRight: 20,
  },
  subtitle: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    paddingRight: 20,
  },
  linkText: {
    color: "white",
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    paddingLeft: 10,
    textDecoration: "none",
  },
}));

const UserNavbar = (props) => {
  const { userLoggedOut, user, bootcamp } = props;
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onUserLoggedOut = async () => {
    try {
      await userLoggedOut(history);
      enqueueSnackbar("User Logged Out Successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar("Something wrong happend", {
        variant: "error",
      });
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Grid container justify={"space-between"} alignItems={"center"}>
              <Grid item>
                <Link to={"/home"} variant='h6' className={classes.title}>
                  DevCamper
                </Link>
                <Link
                  to={"/bootcamps"}
                  variant='h6'
                  className={classes.subtitle}
                >
                  Bootcamps
                </Link>
              </Grid>
              <Grid item>
                {user && user.role === "publisher" && bootcamp ? (
                  <Link to='/bootcamp' className={classes.linkText}>
                    Edit Bootcamp
                  </Link>
                ) : null}
                <Link to='/profile' className={classes.linkText}>
                  Profile
                </Link>
                <Link to='/login' onClick={onUserLoggedOut} className={classes.linkText}>
                    Logout
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    bootcamp: state.bootcamp.bootcamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedOut: (history) => dispatch(userLoggedOut(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
