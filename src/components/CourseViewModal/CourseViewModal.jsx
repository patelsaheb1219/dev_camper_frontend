// Module Imports
import React from "react";
import { Dialog, DialogContent, DialogTitle, makeStyles, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// File Imports
import { styleRules } from './styles';

// Default consts
const useStyles = makeStyles(theme => styleRules(theme));

const CourseViewModal = (props) => {
  const { open, onClose, course } = props;
  const classes = useStyles();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        id='customized-dialog-title'
        className={classes.root}
        onClose={onClose}
      >
        <Typography variant='h5'>Course</Typography>
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
        <Typography>{course && course.title}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default CourseViewModal;
