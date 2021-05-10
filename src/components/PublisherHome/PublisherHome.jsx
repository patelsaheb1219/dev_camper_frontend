// Module Imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

// File Imports
import {
  createBootcamp,
  fetchBootcampCourses,
  fetchUserBootcamp,
  createCourse,
} from "../../redux/actions/bootcampActions";
import AllCourses from "./AllCourses";
import AddCourse from "./AddCourse";
import AddBootcamp from "./AddBootcamp";

// Import Add/Update Bootcamp modal
import AddBootcampModal from "../AddBootcampModal";
import AddCourseModal from "../AddCourseModal";

const PublisherHome = (props) => {
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
  const [addBootcampModal, setAddBootcampModal] = useState(false);
  const [addCourseModal, setAddCourseModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBootcamp = async () => {
      await fetchUserBootcamp();
    };
    if (!bootcamp) {
      fetchBootcamp();
    }
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

  // Create a new Bootcamp
  const createNewBootcamp = async (bootcamp) => {
    try {
      await createBootcamp(bootcamp);
      enqueueSnackbar("Bootcamp Added Successfully!", {
        variant: "success",
      });
      setAddBootcampModal(false);
    } catch (err) {
      enqueueSnackbar(
        JSON.stringify(err.response.data.error)
          .replace("[", "")
          .replace("]", ""),
        {
          variant: "error",
        }
      );
    }
  };

  // Create a new Course
  const createNewCourse = async (course) => {
    try {
      await createCourse(course);
      enqueueSnackbar("Course Added Successfully!", {
        variant: "success",
      });
      setAddCourseModal(false);
    } catch (err) {
      enqueueSnackbar(
        JSON.stringify(err.response.data.error)
          .replace("[", "")
          .replace("]", ""),
        {
          variant: "error",
        }
      );
    }
  };

  // Open/Close bootcamp Modal
  const addNewBootcampModal = () => {
    return (
      <AddBootcampModal
        open={addBootcampModal}
        buttonText={"Add"}
        onClose={() => setAddBootcampModal(false)}
        createBootcamp={(bootcamp) => createNewBootcamp(bootcamp)}
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
        createCourse={(course) => createNewCourse(course)}
        buttonLoading={buttonLoading}
      />
    );
  };

  const LoadingComponent = () => {
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
  };

  if (pageLoading) {
    return <LoadingComponent />;
  }

  return (
    <React.Fragment>
      {buttonLoading ? <LoadingComponent /> : null}
      {!bootcamp ? (
        <AddBootcamp setAddBootcampModal={setAddBootcampModal} />
      ) : null}
      {bootcamp && courses && courses.length === 0 ? (
        <AddCourse setAddCourseModal={setAddCourseModal} />
      ) : null}
      {courses && courses.length > 0 ? <AllCourses courses={courses} setAddCourseModal={setAddCourseModal} /> : null}
      {addNewBootcampModal()}
      {addNewCourseModal()}
    </React.Fragment>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(PublisherHome);