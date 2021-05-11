// Module Imports
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// File Imports
import { styleRules } from "./styles";
import { getAllBootcamps } from "../../redux/actions/bootcampActions";
import BootcampCard from "../BootcampCard/BootcampCard";

// Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Bootcamps = (props) => {
  const { bootcamps, getAllBootcamps, pageLoading } = props;

  const [allBootcamps, setAllBootcamps] = useState([]);

  const getBootcamps = async () => {
    await getAllBootcamps();
    setAllBootcamps(bootcamps);
  };

  useEffect(() => {
    if (bootcamps && bootcamps.length === 0) {
      getBootcamps();
    } else {
      setAllBootcamps(bootcamps);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bootcamps && bootcamps.length === 0) {
      getBootcamps();
    } else {
      setAllBootcamps(bootcamps);
    }
    // eslint-disable-next-line
  }, [bootcamps]);

  const classes = useStyles();

  if (pageLoading) {
    return (
      <Container>
        <Box m={5}>
          <Grid container alignItems={"center"} justify={"center"}>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
  return (
    <Container className={classes.container}>
      <Grid container justify={"center"}>
        <Grid item xs={12} md={8} lg={8}>
          <Box mt={2} mb={2}>
            <Typography variant={"h4"}>All Bootcamps</Typography>
          </Box>
        </Grid>
      </Grid>
      {allBootcamps &&
        allBootcamps.map((bootcamp, index) => {
          return <BootcampCard key={index} bootcamp={bootcamp} />;
        })}
    </Container>
  );
};

const mapStateTopProps = (state) => {
  return {
    bootcamps: state.bootcamp.bootcamps,
    pageLoading: state.user.pageLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBootcamps: () => dispatch(getAllBootcamps()),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(Bootcamps);
