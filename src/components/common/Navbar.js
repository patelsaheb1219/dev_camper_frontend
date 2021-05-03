import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Link
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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
  }
}));

const Navbar = (props) => {
  const { authToken } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              DevCamper
            </Typography>
            {authToken && authToken !== undefined ? (
              <React.Fragment>
                <Button color='inherit'>Dashboard</Button>
                <Button color='inherit'>Logout</Button>
              </React.Fragment>
            ) : (
              <Link href='/login'>
                {"Sign Up"}
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.user.authToken,
  };
};

export default connect(mapStateToProps, null)(Navbar);
