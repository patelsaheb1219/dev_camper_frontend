// Module Imports
import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Link } from "@material-ui/core";

// File Import
import { userLoggedOut } from '../../redux/actions/userActions';

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

const UserNavbar = (props) => {
  const { userLoggedOut } = props;
  const classes = useStyles();
  const history = useHistory();
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
            <Button color='inherit' onClick={() => userLoggedOut(history)}>Logout</Button>
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
