import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
  details: {
    flexDirection: "column"
  }
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ExpansionPanel expanded={expanded === props.panel} onChange={handleChange(props.panel)}>
         <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={props.ariaControl}
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Ticker:{props.ticker}</Typography>
          <Typography className={classes.secondaryHeading}>Type:{props.type}</Typography>
          <Typography className={classes.secondaryHeading}>Total:${props.total}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography >Shares:{props.shares}</Typography>
          <Typography >Cost Per Share:${props.cost}</Typography>
          <Typography >Date:{props.date}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  );
  }