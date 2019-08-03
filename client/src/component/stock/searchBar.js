import React, {Component} from "react";
import StockCard from './StockCard'
import axios from 'axios';

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
            url: 'https://api.iextrading.com/1.0/tops?symbols='+this.state.ticker
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
                symbol:res.data[0].symbol,
                price:res.data[0].askPrice,
                size:res.data[0].askSize
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
                        <button type="submit" onClick={this.findStock}/>
                        </form>
                        <StockCard error={true} errmsg={'This Stock Could Not Be Found'} />
                        </div>
                    )
                }

                    return(
                        <div>
                        <form>
                        <input type="text" placeholder="Enter a Ticker Name" name="search" onChange={this.handleInput} />
                        <button type="submit" onClick={this.findStock}/>
                        </form>
                        <StockCard error={false} title={this.state.stock.symbol} cost={this.state.stock.price} quantity={this.state.stock.size} />
                        </div>
                    )
                
            }

            return(
                <div>
                <form>
                <input type="text" placeholder="Enter a Ticker Name" name="search" onChange={this.handleInput} />
                <button type="submit" onClick={this.findStock}/>
                </form>
                </div>
            )
    }
}

export default SearchPage;