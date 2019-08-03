import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Body from './paper'
import Navbar from '../Navbar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className="">
      <Grid container
            direction="row"
            justify="center"
            alignItems="centers"spacing={0}>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Body/>
        </Grid>
      </Grid>
    </div>
  );
}