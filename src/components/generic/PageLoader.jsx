import React from "react";
import { Container, Grid, Box, CircularProgress } from "@material-ui/core";

const PageLoader = () => {
  return (
    <Container>
      <Grid
        container
        justify={"center"}
        alignItems={"center"}
        style={{ textAlign: "center" }}
      >
        <Grid item xs={12} md={8} lg={8}>
          <Box m={5}>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PageLoader;
