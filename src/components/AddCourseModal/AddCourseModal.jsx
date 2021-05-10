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

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const AddCourseModal = (props) => {
  // Props from parent Component
  const { open, onClose, buttonLoading, createCourse } = props;

  // Default Course object
  let newCourse = {
    title: "",
    description: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
    scholarshipAvailable: false,
  };

  const classes = useStyles();

  const [course, setCourse] = useState(newCourse);

  const updateField = async (e) => {
    let udpatedCourse = course;
    udpatedCourse = { ...udpatedCourse, [e.target.name]: e.target.value };
    await setCourse(udpatedCourse);
  };

  const handleClose = () => {
    onClose(!open);
  };

  const createNewCourse = async () => {
    await createCourse(course);
    await setCourse(newCourse);
    await onClose(false)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        id='customized-dialog-title'
        className={classes.root}
        onClose={handleClose}
      >
        <Typography variant='h6'>Add New Course</Typography>
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
                name='title'
                placeholder='Course Name'
                onChange={(e) => updateField(e)}
                value={course.title}
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
                value={course.description}
              />
            </Box>
          </Grid>

          <Grid container item justify={"space-between"}>
            <Grid item>
              <Box m={1}>
                <OutlinedInput
                  name='weeks'
                  placeholder='No. Of Weeks'
                  onChange={(e) => updateField(e)}
                  value={course.weeks}
                  fullWidth
                  margin={"dense"}
                  type={"number"}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box m={1}>
                <OutlinedInput
                  name='tuition'
                  placeholder='Course Fees/Tuition'
                  onChange={(e) => updateField(e)}
                  value={course.tuition}
                  fullWidth
                  margin={"dense"}
                  type={"number"}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Box m={1}>
              <Select
                name='minimumSkill'
                value={course.minimumSkill}
                onChange={(e) => updateField(e)}
                input={<OutlinedInput fullWidth margin={"dense"} />}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value=''>
                  <em>Minimum Skill Required</em>
                </MenuItem>
                <MenuItem key={"beginner"} value={"beginner"}>
                  Beginner
                </MenuItem>
                <MenuItem key={"intermediate"} value={"intermediate"}>
                  Intermediate
                </MenuItem>
                <MenuItem key={"advanced"} value={"advanced"}>
                  Advanced
                </MenuItem>
              </Select>
            </Box>
          </Grid>

          <Grid item>
            <Box m={1}>
              <Typography>Scholarhips Available</Typography>
              <RadioGroup
                aria-label=''
                name='housing'
                value={course.scholarshipAvailable.toString()}
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => createNewCourse()}
          color='primary'
          variant={"outlined"}
        >
          {buttonLoading ? <CircularProgress size={25} /> : "ADD"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCourseModal;
