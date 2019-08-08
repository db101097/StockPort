import React, {Component} from "react";
import StockCard from './StockCard'
import axios from 'axios';
import Button from '@material-ui/core/Button';

class SearchPage extends Component {
    constructor(props){
        super(props)
        this.state={
            ticker:'',
            getInfo:false,
            stock:'',
            error:false 
        }
        this.handleInput= this.handleInput.bind(this)
    }

    handleInput= (event) => {
        this.setState({
            ticker: event.target.value
        });
    }
    
    findStock = async (e)=>{
        e.preventDefault();
        console.log('ticker ',this.state.ticker.length)
        if(this.state.ticker.length===0){
            console.log('here')
            return;
        }
        const config ={ 
            method: 'get',
            url: 'https://api.worldtradingdata.com/api/v1/stock?symbol='+this.state.ticker+'&api_token=tKd4GiDqziKoCWoyWvlX3aTCTMl6ByQN2w7R1UHH5OVTkt2o7NgPgxZtAgf2'
        }

        try{
            let res=await axios(config)
            console.log(res)
            if(res.data.length<1){
                console.log('bad data')
                this.setState({getInfo:true,error:true})
                console.log('error is ',this.state.error)
            }
            let stock= {
                symbol:res.data.data[0].symbol,
                price:res.data.data[0].price,
                size:res.data.data[0].shares
            }
            this.setState({getInfo:true,stock:stock,error:false})
            console.log(res)
        }catch(err){
            this.setState({error:true})
        }
    }

    render(){

            if(this.state.getInfo===true){
                if(this.state.error===true){
                    return(
                        <div>
                        <form>
                        <input type="text" placeholder="Enter a Ticker Name" name="search" onChange={this.handleInput} />
                        <Button size="small" onClick={this.findStock}>
                            Find
                        </Button>
                        </form>
                        <StockCard error={true} errmsg={'This Stock Could Not Be Found'} />
                        </div>
                    )
                }

                    return(
                        <div>
                        <form>
                        <input type="text" placeholder="Enter a Ticker Name" name="search" onChange={this.handleInput} />
                        <Button size="small" onClick={this.findStock}>
                            Find
                        </Button>
                        </form>
                        <StockCard error={false} title={this.state.stock.symbol} cost={this.state.stock.price} quantity={this.state.stock.size} />
                        </div>
                    )
                
            }

            return(
                <div>
                <form>
                <input type="text" placeholder="Enter a Ticker Name" name="search" onChange={this.handleInput} />
                <Button size="small" onClick={this.findStock}>
                            Find
                </Button>
                </form>
                </div>
            )
    }
}

export default SearchPage;