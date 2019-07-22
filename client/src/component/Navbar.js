import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const navbar = () => {
    return (
        <div>
            <AppBar positiion="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        StockPort
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default navbar;