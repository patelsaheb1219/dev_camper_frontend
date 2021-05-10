// Module Imports
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Container, Grid, Box, Typography, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const AddCourse = (props) => {
  const { setAddCourseModal } = props;

  const classes = useStyles();
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
      </Grid>
    </Container>
  );
};

export default AddCourse;
