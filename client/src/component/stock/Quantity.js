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
        this.validate=this.validate.bind(this)
    }

    handleInput= (event) => {
        this.setState({
            qty: event.target.value
        });
    }

    validate = ()=>{
        console.log('Validate')
        if(typeof(Number(this.state.qty))!=='number'){
            console.log('not a number')
            return false
        }

        else if(this.state.qty<1 || this.state.qty>this.props.maxsize || this.state.qty%1!==0){
            console.log('Other erro')
            return false
        }
        else{
            return true
        }
    }

    makePurchase=async ()=>{
        try{
            const config ={ 
                method: 'put',
                url: 'http://localhost:8080/purchase',
                data:{
                    "id":51,
                    "costPerShare":this.props.price,
                    "ticker":this.props.ticker,
                    "qty":Number(this.state.qty)
                }
            }
            console.log("costPerShare ",this.props.price,
            "ticker ",this.props.ticker,
            "qty ",this.state.qty)
            let res=await axios(config)
            console.log('Purchase ',res)
            alert('Success you copped those stocks')
        }catch(err){
            console.log(err)
            alert('Failed to cop those stocks')
        }
    }

    buy = async (e)=>{
        e.preventDefault();
        try{
            this.makePurchase()
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