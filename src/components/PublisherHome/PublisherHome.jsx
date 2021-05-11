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
  updatedCourse,
  deletedCourse
} from "../../redux/actions/bootcampActions";
import AllCourses from "./AllCourses";
import AddCourse from "./AddCourse";
import AddBootcamp from "./AddBootcamp";
import DeleteItem from "../DeleteItem";

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
    updatedCourse,
    deletedCourse
  } = props;
  const [addBootcampModal, setAddBootcampModal] = useState(false);
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editExistingCourse, setEditExistingCourse] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
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

  // Set add modal to false and remove course object from editExisitingCourse
  const closeCourseModal = async () => {
    await setEditExistingCourse(null);
    await setAddCourseModal(false);
  }

  // Handle Delete Item Modal
  const handleDeleteItem = async () => {
    await setDeleteCourseId(null);
    await setDeleteModal(false);
  }

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

  // Update Existing Course
  const updateCourse = async (course) => {
    try {
      await updatedCourse(course);
      enqueueSnackbar("Course Updated Successfully!", {
        variant: "success",
      });
      await setEditExistingCourse(null);
      await setAddCourseModal(false);
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
  }

  // Delete Course
  const deleteCourse = async () => {
    try {
      await deletedCourse(deleteCourseId);
      enqueueSnackbar("Course Deleted Successfully!", {
        variant: "success",
      });
      await setDeleteCourseId(null);
      await setDeleteModal(false);
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
  }

  // Set Course for Edit and modal to true
  const editCourse = async (course) => {
    await setEditExistingCourse(course);
    await setAddCourseModal(true);
  }

  // Set Course Id for delete and open Delete Item Modal
  const setDeleteItem = async (courseId) => {
    await setDeleteCourseId(courseId);
    await setDeleteModal(true);
  }

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

  // Open/Close Course Modal
  const addNewCourseModal = () => {
    return (
      <AddCourseModal
        open={addCourseModal}
        buttonText={editExistingCourse ? "Update" : "Add"}
        onClose={closeCourseModal}
        onClick={(course) => editExistingCourse ? updateCourse(course) : createNewCourse(course)}
        buttonLoading={buttonLoading}
        editItem={editExistingCourse}
      />
    );
  };

  // Open/Close DelteItem Modal
  const deleteItem = () => {
    return (
      <DeleteItem 
        open={deleteModal}
        title={'Delete Course'}
        description={'Are you sure you want to delete this course?'}
        handleClose={handleDeleteItem}
        onClick={deleteCourse}
      />
    )
  }

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
      {!bootcamp ? (
        <AddBootcamp setAddBootcampModal={setAddBootcampModal} />
      ) : null}
      {bootcamp && courses && courses.length === 0 ? (
        <AddCourse setAddCourseModal={setAddCourseModal} />
      ) : null}
      {courses && courses.length > 0 
        ? (<AllCourses 
            courses={courses} 
            setAddCourseModal={setAddCourseModal} 
            editCourse={editCourse} 
            setDeleteItem={setDeleteItem} 
          />) : null}
      {addNewBootcampModal()}
      {addNewCourseModal()}
      {deleteItem()}
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
    updatedCourse: (course) => dispatch(updatedCourse(course)),
    deletedCourse: (id) => dispatch(deletedCourse(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherHome);