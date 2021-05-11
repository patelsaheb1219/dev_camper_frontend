// Module Imports
import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Grid } from "@material-ui/core";
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
    paddingRight: 20
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
    textDecoration: "none",
  },
}));

const UserNavbar = (props) => {
  const { userLoggedOut } = props;
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
            <Grid container justify={"space-between"}>
              <Grid item>
                <Link to={"/home"} variant='h6' className={classes.title}>
                  DevCamper
                </Link>
                <Link to={"/bootcamps"} variant='h6' className={classes.subtitle}>
                  Bootcamps
                </Link>
              </Grid>
              <Grid item>
                <Link to='/profile' className={classes.linkText}>
                  Profile
                </Link>
                <Button color='inherit' onClick={onUserLoggedOut}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedOut: (history) => dispatch(userLoggedOut(history)),
  };
};

export default connect(null, mapDispatchToProps)(UserNavbar);
