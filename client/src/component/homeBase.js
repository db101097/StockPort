import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Panel from './panel'
import Stocks from './stock/StockSearch'
import Balance from './balance/balance';
import Ex from './ex';

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
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Balance/>
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5}>
          <Stocks/>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Balance/>
        </Grid>
      </Grid>
      <Grid container
            direction="row"
            justify="space-evenly"
            alignItems="centers"spacing={3}>
        <Grid item xs={11} sm={11} md={11} lg={11}>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Panel/>
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={4}>
          <Ex/>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Balance/>
        </Grid>
      </Grid>
    </div>
  );
}