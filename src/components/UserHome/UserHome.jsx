// Module Import
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Divider,
} from "@material-ui/core";

// // File Imports
import { styleRules } from "./styles";
import { getAllCourses } from "../../redux/actions/courseActions";
import PageLoader from "../generic/PageLoader";
import CourseCard from "../CourseCard";

// //Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const UserHome = (props) => {
  const { pageLoading, courses, getAllCourses } = props;
  const classes = useStyles();

  useEffect(() => {
    const fetchCourses = async () => {
      await getAllCourses();
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Grid container justify={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={8}>
          <Box m={3} p={3} boxShadow={3} className={classes.boxContainer}>
            <Typography variant={"h4"}>All Courses</Typography>
            <Divider className={classes.divider} />
            {courses &&
              courses.map((course, index) => {
                return (
                  <Box m={2} key={course._id}>
                    <CourseCard
                      course={course}
                      index={index}
                      xs={12}
                      md={12}
                      lg={12}
                    />
                  </Box>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.course.allCourses,
    pageLoading: state.user.pageLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: () => dispatch(getAllCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
