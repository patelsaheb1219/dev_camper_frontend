// Module Imports
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

// File Imports
import { styleRules } from "./styles";
import { getBootcampById } from "../../redux/actions/bootcampActions";
import PageLoader from "../generic/PageLoader";

// Default consts
const useStyles = makeStyles((theme) => styleRules(theme));

const BootcampView = (props) => {
  const { getBootcampById, pageLoading } = props;
  const [bootcamp, setBootcamp] = useState(null);
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    const findBootcamp = async () => {
      const response = await getBootcampById(id);
      setBootcamp(response);
    };
    findBootcamp();
  }, [getBootcampById, id]);

  if (pageLoading || !bootcamp) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Grid container justify={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={8}>
          <Box
            mt={3}
            mb={3}
            p={3}
            boxShadow={2}
            className={classes.boxContainer}
          >
            <Typography variant={"h4"}>{bootcamp.name}</Typography>
            <Divider className={classes.divider} />
            <Typography>{bootcamp.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    pageLoading: state.user.pageLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBootcampById: (id) => dispatch(getBootcampById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BootcampView);