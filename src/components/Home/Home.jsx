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
  fetchBootcampCourses,
  fetchUserBootcamp,
  createCourse,
} from "../../redux/actions/bootcampActions";

// Import Add/Update Bootcamp modal
import AddBootcampModal from "../AddBootcampModal";
import AddCourseModal from "../AddCourseModal";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Home = (props) => {
  const {
    createBootcamp,
    buttonLoading,
    fetchUserBootcamp,
    fetchBootcampCourses,
    bootcamp,
    courses,
    pageLoading,
    createCourse,
  } = props;
  const classes = useStyles();
  const [addBootcampModal, setAddBootcampModal] = useState(false);
  const [addCourseModal, setAddCourseModal] = useState(false);

  useEffect(() => {
    const fetchBootcamp = async () => {
      await fetchUserBootcamp();
    };
    fetchBootcamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (bootcamp && bootcamp.id) {
        await fetchBootcampCourses(bootcamp.id);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootcamp]);

  // Open/Close bootcamp Modal
  const addNewBootcampModal = () => {
    return (
      <AddBootcampModal
        open={addBootcampModal}
        buttonText={"Add"}
        onClose={() => setAddBootcampModal(false)}
        createBootcamp={createBootcamp}
        buttonLoading={buttonLoading}
      />
    );
  };

  const addNewCourseModal = () => {
    return (
      <AddCourseModal
        open={addCourseModal}
        buttonText={"Add"}
        onClose={() => setAddCourseModal(false)}
        createCourse={createCourse}
        buttonLoading={buttonLoading}
      />
    );
  };

  if (pageLoading || buttonLoading) {
    return (
      <Container>
        <Box m={5}>
          <Grid container alignItems={"center"} justify={"center"}>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
        {addNewBootcampModal()}
        {addNewCourseModal()}
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
                  onClick={() => setAddBootcampModal(true)}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Box>
          </Grid>
          {addNewBootcampModal()}
        </Grid>
      </Container>
    );
  }

  if (bootcamp && courses && courses.length === 0)
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
              <Typography variant={"h6"}>Add New course</Typography>
              <Box mt={3}>
                <Fab
                  color='primary'
                  aria-label='add'
                  onClick={() => setAddCourseModal(true)}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Box>
          </Grid>
          {addNewCourseModal()}
        </Grid>
      </Container>
    );
  
  if (courses && courses.length > 0) {
    return (
      <Container>
        {
          courses.map(course => {
            return <Container>
              <Typography>{course.title}</Typography>
            </Container>  
          })
        }
      </Container>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    buttonLoading: state.user.buttonLoading,
    pageLoading: state.user.pageLoading,
    bootcamp: state.bootcamp.bootcamp,
    courses: state.bootcamp.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBootcamp: (bootcamp) => dispatch(createBootcamp(bootcamp)),
    fetchUserBootcamp: () => dispatch(fetchUserBootcamp()),
    fetchBootcampCourses: (id) => dispatch(fetchBootcampCourses(id)),
    createCourse: (course) => dispatch(createCourse(course)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
