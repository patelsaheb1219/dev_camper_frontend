import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const AddBootcamp = (props) => {
  const { setAddBootcampModal } = props;

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
            <Typography variant={"h6"}>
              To begin your journey with the <b>DevCamper</b> platform to teach
              new technologies to the real world start your career by
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
      </Grid>
    </Container>
  );
};

export default AddBootcamp;
