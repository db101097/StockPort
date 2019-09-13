import React, {Component} from 'react'
import SearchBar from "./searchBar"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies'

class StockSearch extends Component{
    constructor(props){
        super(props)
        this.state={
            balance:'$0'
        }
    }


    render(){
        return (
            <Card className="">
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Stocks
                </Typography>
                <Button size="small" onClick={this.buy}>
                     BUY
                 </Button>s
                </CardContent>
            </CardActionArea>
            </Card>
        )
    }
}

export default StockSearch;