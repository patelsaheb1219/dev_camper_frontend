// Module Imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Typography,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

// File Imports
import { styleRules } from "./styles";
import {
  createBootcamp,
  fetchUserBootcamp,
} from "../../redux/actions/bootcampActions";

// Import Add/Update Bootcamp modal
import AddBootcampModal from "../AddBootcampModal";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Home = (props) => {
  const {
    createBootcamp,
    buttonLoading,
    fetchUserBootcamp,
    bootcamp,
    pageLoading,
  } = props;
  const classes = useStyles();
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    const fetchBootcamp = async () => {
      await fetchUserBootcamp();
    };
    fetchBootcamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open/Close bootcamp Modal
  const addBootcampModal = () => {
    return (
      <AddBootcampModal
        open={addModal}
        buttonText={"Add"}
        onClose={() => setAddModal(false)}
        createBootcamp={createBootcamp}
        buttonLoading={buttonLoading}
      />
    );
  };

  if (pageLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!bootcamp) {
    return (
      <Container>
        <Grid
          container
          direction={"row"}
          justify={"center"}
          alignItems={"center"}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={8} lg={7}>
            <Box m={5} p={5}>
              <img
                src={"coding_bootcamp.png"}
                className={classes.containerImage}
                alt={"Header"}
              />
              <Typography variant={"h6"}>
                To begin your journey with the <b>DevCamper</b> platform to
                teach new technologies to the real world start your career by
              </Typography>
              <Typography variant={"h6"}>
                Creating a{" "}
                <b>
                  <i>new Bootcamp</i>
                </b>{" "}
                to add courses.
              </Typography>
              <Box mt={3}>
                <Fab
                  color='primary'
                  aria-label='add'
                  onClick={() => setAddModal(true)}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Box>
          </Grid>
          {addBootcampModal()}
        </Grid>
      </Container>
    );
  }

  if (bootcamp) return <Container>
    <Grid
          container
          direction={"row"}
          justify={"center"}
          alignItems={"center"}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={8} lg={7}>
            <Box m={5} p={5}>
              <img
                src={"coding_bootcamp.png"}
                className={classes.containerImage}
                alt={"Header"}
              />
              <Typography variant={"h6"}>
                Add Your course
              </Typography>
              <Box mt={3}>
                <Fab
                  color='primary'
                  aria-label='add'
                  onClick={() => setAddModal(true)}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Box>
          </Grid>
          {addBootcampModal()}
        </Grid>
  </Container>;
};

const mapStateToProps = (state) => {
  return {
    buttonLoading: state.user.buttonLoading,
    bootcamp: state.bootcamp.bootcamp,
    pageLoading: state.user.pageLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBootcamp: (bootcamp) => dispatch(createBootcamp(bootcamp)),
    fetchUserBootcamp: () => dispatch(fetchUserBootcamp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
