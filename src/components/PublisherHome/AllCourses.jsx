// Module Imports
import React from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// File Imports
import CourseCard from "../CourseCard";

const AllCourses = (props) => {
  const { courses, setAddCourseModal } = props;
  return (
    <Box mt={3}>
      <Container>
        <Grid container justify={"center"}>
          <Grid item xs={12} md={8} lg={8}>
            <Grid container justify={"space-between"} alignItems={"center"}>
              <Grid item>
                <Box mb={2}>
                  <Typography variant={"h4"}>All Courses</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box mb={2}>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                    onClick={() => setAddCourseModal(true)}
                  >
                    Add New Course
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {courses.map((course, index) => {
          return <CourseCard course={course} index={index} />;
        })}
      </Container>
    </Box>
  );
};

export default AllCourses;
