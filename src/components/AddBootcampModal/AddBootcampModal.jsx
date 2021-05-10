// Module Imports
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  OutlinedInput,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";
import { careerOptions } from "../../utils/careerOptions";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));
let newBootcamp = {
  name: "",
  description: "",
  website: "",
  phone: "",
  email: "",
  address: "",
  careers: [''],
  housing: false,
  jobAssistance: false,
  jobGuarantee: false,
  acceptGi: false,
};

const AddBootcampModal = (props) => {
  const { open, onClose, createBootcamp, buttonLoading } = props;

  const classes = useStyles();

  const [bootcamp, setBootcamp] = useState(newBootcamp);
  const [options, setOptions] = useState([]);

  const handleClose = () => {
    onClose(!open);
  };

  const updateField = async (e) => {
    let updatedBootcamp = bootcamp;
    updatedBootcamp = { ...updatedBootcamp, [e.target.name]: e.target.value };
    await setBootcamp(updatedBootcamp);
  };

  const updateOptions = async (e) => {
    setOptions(e.target.value);
  };

  // Add New Bootcamp
  const addNewBootcamp = async () => {
    let finalBootcamp = bootcamp;
    finalBootcamp = { ...finalBootcamp, careers: options };
    await createBootcamp(finalBootcamp);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle
        id='customized-dialog-title'
        className={classes.root}
        onClose={handleClose}
      >
        <Typography variant='h6'>Add New Bootcamp</Typography>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction={"column"}>
          <Grid item>
            <Box m={1}>
              <OutlinedInput
                name='name'
                placeholder='Bootcamp Name'
                onChange={(e) => updateField(e)}
                value={bootcamp.name}
                fullWidth
                margin={"dense"}
                autoFocus
              />
            </Box>
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
                value={bootcamp.description}
              />
            </Box>
          </Grid>

          <Grid item>
            <Box m={1}>
              <OutlinedInput
                name='website'
                placeholder='Bootcamp Website'
                onChange={(e) => updateField(e)}
                value={bootcamp.website}
                fullWidth
                margin={"dense"}
              />
            </Box>
          </Grid>

          <Grid container item justify={"space-between"}>
            <Grid item>
              <Box m={1}>
                <OutlinedInput
                  name='email'
                  placeholder='Bootcamp Email'
                  onChange={(e) => updateField(e)}
                  value={bootcamp.email}
                  fullWidth
                  margin={"dense"}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box m={1}>
                <OutlinedInput
                  name='phone'
                  placeholder='Bootcamp Contact Number'
                  onChange={(e) => updateField(e)}
                  value={bootcamp.phone}
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
                value={bootcamp.address}
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
                input={
                  <OutlinedInput fullWidth margin={"dense"} />
                }
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Career Options</em>;
                  }
      
                  return selected.join(', ');
                }}
                multiple
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {careerOptions.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.key}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>

          <Grid container item xs={12} direction={"row"} justify='flex-start'>
            <Grid item>
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
            <Grid item>
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
          </Grid>

          <Grid container item xs={12} direction={"row"} justify='flex-start'>
            <Grid item>
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
            <Grid item>
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => addNewBootcamp()} color='primary' variant={"outlined"}>
          {buttonLoading ? <CircularProgress size={25} /> : 'ADD'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBootcampModal;
