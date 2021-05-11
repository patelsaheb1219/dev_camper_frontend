// Module Imports
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// File Imports
import { styleRules } from './styles';

// Default const
const useStyles = makeStyles((theme) => styleRules(theme));

const Bootcamps = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      All Bootcamps
    </Container>
  )
}

export default Bootcamps
