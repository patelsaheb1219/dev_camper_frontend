// Module Imports
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  Box,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from "./styles";

//Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const DeleteItem = (props) => {
  const { open, title, handleClose, description, onClick} = props;
  const classes = useStyles();
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        id='customized-dialog-title'
        className={classes.root}
        onClose={handleClose}
      >
        <Typography variant='h6'>{title}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Grid container direction='row' justify='flex-end' alignItems='center'>
          <Grid item>
            <Box ml={1} mr={1}>
              <Button
                variant='contained'
                color='inherit'
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box ml={1} mr={1}>
              <Button
                variant='contained'
                color='secondary'
                onClick={onClick}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItem;
