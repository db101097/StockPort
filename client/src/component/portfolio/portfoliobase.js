import React,{ useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import List from './list'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: '100%'
  },
}));


export default function PaperSheet() {
  const classes = useStyles();  


    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Portfolio
          </Typography>
          <Typography component="p">
            Your Portfolio
          </Typography>
          <List/>
        </Paper>
      </div>
    );
}