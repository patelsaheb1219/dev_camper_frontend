// Module Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Grid, Box, Typography, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

// File Imports
import { styleRules } from "./styles";
import { createBootcamp } from '../../redux/actions/bootcampActions';

// Import Add/Update Bootcamp modal
import AddBootcampModal from "../AddBootcampModal";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Home = (props) => {
  const { createBootcamp, buttonLoading } = props;
  const classes = useStyles();
  const [addModal, setAddModal] = useState(false);

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
            <Typography variant={'h6'}>
              To begin your journey with the <b>DevCamper</b> platform to teach
              new technologies to the real world start your career by
            </Typography>
            <Typography variant={'h6'}>
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
};

const mapStateToProps = state => {
  return {
    buttonLoading: state.user.buttonLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBootcamp: (bootcamp) => dispatch(createBootcamp(bootcamp))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
