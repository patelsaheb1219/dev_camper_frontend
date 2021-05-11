import React from "react";
import { Box, Grid, Divider, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// File Imports
import { styleRules } from "./styles";
import { capitalize } from "../../utils/general";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const CourseCard = (props) => {
  const { course, index, editCourse, setDeleteItem } = props;
  const classes = useStyles();
  
  return (
    <Box mb={3}>
      <Grid container alignItems={"center"} justify={"center"} key={index}>
        <Grid item xs={12} md={8} lg={8} className={classes.boxContainer}>
          <Box p={3} boxShadow={3}>
            <Typography variant={"h5"}>{course.title}</Typography>
            <Divider className={classes.divider} />
            <Typography variant={"body1"}>{course.description}</Typography>
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
                  <Typography>{capitalize(course.minimumSkill)}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Scholarhips Available</b>
                  </Typography>
                  <Typography>
                    {course.scholarshipAvailable ? `Yes` : `No`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider className={classes.divider} />
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
                    startIcon={<EditIcon />}
                    onClick={() => editCourse(course)}
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
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteItem(course._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseCard;
