import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from './ex'
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: '60vw'
  },
}));

const getData=async()=>{
    const config={
        method: 'get',
        url: 'http://localhost:8080/transaction/51',
    }
    let res=await Axios(config)
}

export default function PaperSheet() {
  const classes = useStyles();  

  //axios call to get all transactions 
    let transactions=getData()
  //for loop to generate an expansion panel component for each transaction

  //pass the componentes to the list compe
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Transactions
        </Typography>
        <Typography component="p">
          Your Transactions
        </Typography>
        <List/>
      </Paper>
    </div>
  );
}