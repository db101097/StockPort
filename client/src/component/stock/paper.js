import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Search from './searchBar'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: '60vw'
  },
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Find Stocks
        </Typography>
        <Typography component="p">
          Search For Stocks Using It's Ticker Symbol
        </Typography>
        <Search/>
      </Paper>
    </div>
  );
}