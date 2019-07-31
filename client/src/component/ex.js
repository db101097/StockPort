import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '1000px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="APPL" />
        <ListItemSecondaryAction>
              {"4.99"}
            </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="FB" />
        <ListItemSecondaryAction>
              {"14.99"}
            </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemText primary="ATT" />
        <ListItemSecondaryAction>
              {"34.99"}
            </ListItemSecondaryAction>
      </ListItem>
      <Divider light />
    </List>
  );
}