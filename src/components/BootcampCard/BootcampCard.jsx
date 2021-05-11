// Module Imports
import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Divider,
  Link,
} from "@material-ui/core";

// File Imports
import { styleRules } from "./styles";

// Default consts
const useStyles = makeStyles((theme) => styleRules(theme));

const BootcampCard = (props) => {
  const { bootcamp } = props;
  const classes = useStyles();
  return (
    <Box mb={2}>
      <Grid container justify={"center"} alignItems={"flex-start"}>
        <Grid item xs={12} md={8} lg={8} className={classes.boxContainer}>
          <Box p={3} boxShadow={3}>
            <Typography variant={"h5"}>
              <b>{bootcamp.name}</b>
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant={"body1"}>{bootcamp.description}</Typography>
            <Box mt={1}>
              <Grid
                container
                justify={"space-between"}
                alignItems={"flex-start"}
              >
                <Grid item>
                  <Typography>
                    <b>Phone</b>
                  </Typography>
                  <Typography><Link href={`tel:${bootcamp.phone}`}>{bootcamp.phone}</Link></Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Email</b>
                  </Typography>
                  <Typography>
                    <Link href={`mailto:${bootcamp.email}`} target={'_blank'}>
                      {bootcamp.email}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Website</b>
                  </Typography>
                  <Typography>
                    <Link href={`${bootcamp.website}`} target={"_blank"}>
                      {bootcamp.website}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BootcampCard;
