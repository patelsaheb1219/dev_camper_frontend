// Module Imports
import React from 'react';
import { Box, Container, Grid, Divider, Button, Typography } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";
import { capitalize } from "../../utils/general";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const AllCourses = (props) => {
  const { courses } = props;

  const classes = useStyles();
  return (
    <Box mt={3}>
      <Container>
        <Grid container alignItems={"center"} justify={"center"}>
          <Grid item xs={12} md={8} lg={8}>
            <Box mb={2}>
              <Typography variant={"h4"}>All Courses</Typography>
            </Box>
          </Grid>
        </Grid>
        {courses.map((course, index) => {
          return (
            <Grid
              container
              alignItems={"center"}
              justify={"center"}
              key={index}
            >
              <Grid item xs={12} md={8} lg={8}>
                <Box p={3} boxShadow={3} style={{ backgroundColor: "#fff" }}>
                  <Typography variant={"h5"}>{course.title}</Typography>
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <Typography variant={"body1"}>
                    {course.description}
                  </Typography>
                  <Box mt={2}>
                    <Grid
                      container
                      justify={"space-between"}
                      alignItems={"flex-start"}
                    >
                      <Grid item>
                        <Typography>
                          <b>Weeks</b>
                        </Typography>
                        <Typography>{course.weeks}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <b>Tuition Fees</b>
                        </Typography>
                        <Typography>{course.tuition}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <b>Minimum Skill Required</b>
                        </Typography>
                        <Typography>
                          {capitalize(course.minimumSkill)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <b>Scholarhips Available</b>
                        </Typography>
                        <Typography>
                          {course.scholarhipsAvailable ? `Yes` : `No`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider style={{ marginTop: 8, marginBottom: 16 }} />
                  <Grid
                    container
                    direction='row'
                    justify='flex-end'
                    alignItems='center'
                  >
                    <Grid item>
                      <Box ml={1} mr={1}>
                        <Button
                          variant='contained'
                          color='inherit'
                          className={classes.button}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box ml={1} mr={1}>
                        <Button
                          variant='contained'
                          color='secondary'
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Container>
    </Box>
  );
}

export default AllCourses
