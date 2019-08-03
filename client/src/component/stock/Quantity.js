import React, {Component} from "react";
import StockCard from './StockCard'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { validate } from "@babel/types";

class SearchPage extends Component {
    constructor(props){
        super(props)
        this.state={
            qty:0,
            getInfo:false,
            stock:'',
            error:false 
        }
        this.handleInput= this.handleInput.bind(this)
    }

    handleInput= (event) => {
        this.setState({
            qty: event.target.value
        });
    }
    validate = ()=>{
        if(typeof(this.state.qty)!=='number'){
            return false
        }

        else if(this.state.qty<1 || this.state.qty>this.props.qty || this.state.qty%1!==0){
            return false
        }

        return true
    }

    makePurchase=async ()=>{
        const config ={ 
            method: 'get',
            url: 'https://api.iextrading.com/1.0/tops?symbols='+this.state.ticker
        }

        let res=await axios(config)
        console.log(res)
    }

    buy = async (e)=>{
        e.preventDefault();
        try{
            let valid=validate()
            if(valid!==true){
                throw Object.assign(
                    new Error('Invalid Quantity'),
                    { code: 400 }
                 );
            }
            
        }catch(err){
            console.log(err)
            let e = {
                status:true,
                message:err
            }
            this.setState({error:e})
        }
        
    }

    render(){
            return(
                <div>
                <form>
                <input type="text" placeholder="Enter a Ticker Name" name="search" onChange={this.handleInput} />
                <Button size="small" onClick={this.buy}>
                     BUY
                 </Button>
                </form>
                </div>
            )
    }
}

export default SearchPage;