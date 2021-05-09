// Module Imports
import React from "react";
import { AppBar, Toolbar, Typography, Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Default Style Const
const useStyles = makeStyles((theme) => ({
  positionFixed: {
    top: 'auto',
    bottom: 0
  },
  footerText: {
    color: "#fff",
    fontWeight: 600,
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position='fixed' classes={{ positionFixed: classes.positionFixed }}>
      <Toolbar>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <Typography
              variant='body2'
              align='center'
              className={classes.footerText}
            >
              {"Copyright © "}
              {new Date().getFullYear()}{" "}
              <Link color='inherit' href='#'>
                DevCamper
              </Link>
              {"."}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
