import React, {Component} from "react";
import StockCard from './StockCard'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { validate } from "@babel/types";
import Cookies from 'react-cookies'
import Alert from './Alert'
class SearchPage extends Component {
    constructor(props){
        super(props)
        this.state={
            qty:0,
            getInfo:false,
            stock:'',
            status:'neutral'
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
                    "id":Cookies.load('user'),
                    "costPerShare":this.props.price,
                    "ticker":this.props.ticker,
                    "qty":Number(this.state.qty)
                },
                headers: {
                    Authorization: "Bearer " + Cookies.load('token')
                }
            }
            console.log("costPerShare ",this.props.price,
            "ticker ",this.props.ticker,
            "qty ",this.state.qty)
            let res=await axios(config)
            console.log('Purchase ',res)
        }catch(err){
            console.log(err)
            this.setState({status:'Failed'})
        }
    }

    buy = async (e)=>{
        e.preventDefault();
        try{
            this.makePurchase()
            this.setState({status:'Success'})
        }catch(err){
            console.log(err)
            let e = {
                status:true,
                message:err
            }
            this.setState({status:'Failed'})
        } 
    }

    componentDidMount(){
        this.setState({status:'neutral'})
    }

    render(){
        console.log('status is',this.state.status)
        if(this.state.status==='Failed'){
            return(
                <div>
                 <Alert message={"Failed To Purchase Stocks"} open={true} header={"Error"}/>
                <form>
                <input type="text" placeholder="Enter a Quantity" name="search" onChange={this.handleInput} />
                <Button size="small" onClick={this.buy}>
                     BUY
                 </Button>
                </form>
                </div>
            )
        }
        else if(this.state.status==='Success'){
            return(
                <div>
                 <Alert message={"Purchase Completed"} open={true} header={"Success"}/>
                <form>
                <input type="text" placeholder="Enter a Quantity" name="search" onChange={this.handleInput} />
                <Button size="small" onClick={this.buy}>
                     BUY
                 </Button>
                </form>
                </div>
            )
        }

            return(
                <div>
                <form>
                <input type="text" placeholder="Enter a Quantity" name="search" onChange={this.handleInput} />
                <Button size="small" onClick={this.buy}>
                     BUY
                 </Button>
                </form>
                </div>
            )
    }
}

export default SearchPage;