import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

export default function SimpleAppBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar positiion="static"  style={{ background: '#216B18' }}>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        StockPort
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    )
}