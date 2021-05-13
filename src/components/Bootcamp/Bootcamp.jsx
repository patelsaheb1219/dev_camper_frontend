import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  OutlinedInput,
  Select,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

// File Imports
import { styleRules } from "./styles";
import { careerOptions } from "../../utils/careerOptions";
import { fetchUserBootcamp } from "../../redux/actions/bootcampActions";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Bootcamp = (props) => {
  const { bootcamp, buttonLoading, fetchUserBootcamp, pageLoading } = props;
  const [editBootcamp, setEditBootcamp] = useState(null);
  const [options, setOptions] = useState([]);

  const classes = useStyles();

  const fetchBootcamp = async () => {
    await fetchUserBootcamp();
    if (bootcamp) {
      setEditBootcamp(bootcamp);
      setOptions(bootcamp.careers);
    }
  };

  useEffect(() => {
    if (bootcamp) {
      setEditBootcamp(bootcamp);
      setOptions(bootcamp.careers);
    } else {
      fetchBootcamp();
    }
  }, [bootcamp]);

  const updateField = async (e) => {
    let updatedBootcamp = editBootcamp;
    updatedBootcamp = { ...updatedBootcamp, [e.target.name]: e.target.value };
    await setEditBootcamp(updatedBootcamp);
  };

  const updateOptions = async (e) => {
    setOptions(e.target.value);
  };

  // // Edit Bootcamp
  // const editBootcamp = async () => {
  //   let finalBootcamp = bootcamp;
  //   finalBootcamp = { ...finalBootcamp, careers: options };
  //   await createBootcamp(finalBootcamp);
  // };

  if (!bootcamp || pageLoading) {
    return (
      <Container>
        <Box>
          <Grid container justify={"center"} alignItems={"center"}>
            <Grid item xs={12} md={8} lg={8}>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  if (editBootcamp) {
    return (
      <Container>
        <Box mt={2}>
          <Grid container justify={"center"} alignItems={"center"}>
            <Grid item xs={12} md={8} lg={8}>
              <Box
                mt={2}
                p={3}
                boxShadow={3}
                style={{ backgroundColor: "#fff" }}
              >
                <Typography variant={"h4"}>Edit Bootcamp</Typography>
                <Grid container direction={"column"}>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Box m={1}>
                        <OutlinedInput
                          name='name'
                          placeholder='Bootcamp Name'
                          onChange={(e) => updateField(e)}
                          value={editBootcamp.name}
                          fullWidth
                          margin={"dense"}
                          autoFocus
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Box m={1}>
                        <OutlinedInput
                          name='website'
                          placeholder='Bootcamp Website'
                          onChange={(e) => updateField(e)}
                          value={editBootcamp.website}
                          fullWidth
                          margin={"dense"}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Box m={1}>
                      <OutlinedInput
                        name='description'
                        rowsMin={4}
                        cols={48}
                        multiline
                        fullWidth
                        placeholder='Description'
                        onChange={(e) => updateField(e)}
                        value={editBootcamp.description}
                      />
                    </Box>
                  </Grid>

                  <Grid container item>
                    <Grid item xs={12} md={6} lg={6}>
                      <Box m={1}>
                        <OutlinedInput
                          name='email'
                          placeholder='Bootcamp Email'
                          onChange={(e) => updateField(e)}
                          value={editBootcamp.email}
                          fullWidth
                          margin={"dense"}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Box m={1}>
                        <OutlinedInput
                          name='phone'
                          placeholder='Bootcamp Contact Number'
                          onChange={(e) => updateField(e)}
                          value={editBootcamp.phone}
                          fullWidth
                          margin={"dense"}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Box m={1}>
                      <OutlinedInput
                        name='address'
                        placeholder='Bootcamp address'
                        onChange={(e) => updateField(e)}
                        value={bootcamp.location.formattedAddress}
                        fullWidth
                        margin={"dense"}
                      />
                    </Box>
                  </Grid>

                  <Grid item>
                    <Box m={1}>
                      <Select
                        name='careers'
                        value={options}
                        onChange={(e) => updateOptions(e)}
                        input={<OutlinedInput fullWidth margin={"dense"} />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Career Options</em>;
                          }

                          return selected.join(", ");
                        }}
                        multiple
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {careerOptions.map((option) => (
                          <MenuItem key={option.key} value={option.value}>
                            {option.key}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Grid>

                  <Grid
                    container
                    item
                    xs={12}
                    direction={"row"}
                    justify='flex-start'
                  >
                    <Grid item xs={12} md={3} lg={3}>
                      <Box m={1}>
                        <Typography>Housing</Typography>
                        <RadioGroup
                          aria-label=''
                          name='housing'
                          value={bootcamp.housing.toString()}
                          onChange={(e) => updateField(e)}
                        >
                          <Grid container direction='row' justify='flex-start'>
                            <Grid item>
                              <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Yes'
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                value='false'
                                control={<Radio color='primary' />}
                                label='No'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Box m={1}>
                        <Typography>Job Assitance</Typography>
                        <RadioGroup
                          aria-label='jobAssistance'
                          name='jobAssistance'
                          value={bootcamp.jobAssistance.toString()}
                          onChange={(e) => updateField(e)}
                        >
                          <Grid container direction='row' justify='flex-start'>
                            <Grid item>
                              <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Yes'
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                value='false'
                                control={<Radio color='primary' />}
                                label='No'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Box m={1}>
                        <Typography>Job Gurantee</Typography>
                        <RadioGroup
                          aria-label='jobGuarantee'
                          name='jobGuarantee'
                          value={bootcamp.jobGuarantee.toString()}
                          onChange={(e) => updateField(e)}
                        >
                          <Grid container direction='row' justify='flex-start'>
                            <Grid item>
                              <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Yes'
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                value='false'
                                control={<Radio color='primary' />}
                                label='No'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Box m={1}>
                        <Typography>Accept Gi</Typography>
                        <RadioGroup
                          aria-label='acceptGi'
                          name='acceptGi'
                          value={bootcamp.acceptGi.toString()}
                          onChange={(e) => updateField(e)}
                        >
                          <Grid container direction='row' justify='flex-start'>
                            <Grid item>
                              <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Yes'
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                value='false'
                                control={<Radio color='primary' />}
                                label='No'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={classes.submit}
                      onClick={() => console.log(editBootcamp)}
                      disabled={buttonLoading}
                    >
                      {
                        buttonLoading ? <CircularProgress size={25} /> : "Edit"
                      }
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  return null;
};

const mapStateToProps = (state) => {
  return {
    pageLoading: state.user.pageLoading,
    buttonLoading: state.user.buttonLoading,
    bootcamp: state.bootcamp.bootcamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserBootcamp: () => dispatch(fetchUserBootcamp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bootcamp);
