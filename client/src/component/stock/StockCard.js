import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Quantity from './Quantity'

const useStyles = makeStyles({
  card: {
    maxWidth: 1000,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();

  if(props.error===true){
    return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.errmsg}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ask Size: ${props.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ask Price: {props.cost}
          </Typography>
          <Quantity maxsize={props.quantity}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}