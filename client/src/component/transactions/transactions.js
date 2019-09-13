import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Body from './transactionbase'
import Navbar from '../Navbar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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
            <Navbar/>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
        <Toolbar>
                    <Typography variant="title" color="inherit">
                        
                    </Typography>
        </Toolbar>
        <Toolbar>
                    <Typography variant="title" color="inherit">
                       
                    </Typography>
        </Toolbar>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Body/>
        </Grid>
      </Grid>
    </div>
  );
}