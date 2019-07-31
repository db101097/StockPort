import React, {Component} from "react";
import axios from 'axios';

class SearchPage extends Component {
    constructor(props){
        super(props)
        this.state={
            ticker:''
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
        console.log('ticker ',this.state.ticker)
        const config ={ 
            method: 'get',
            url: 'https://api.iextrading.com/1.0/tops?symbols='+this.state.ticker
        }

        try{
            let res=await axios(config)
            console.log(res)
            alert(res)
        }catch(err){
            console.log(err)
            alert('No Stock Found')
        }
    }

    render(){
        return (
            <form>
            <input type="text" placeholder="Search.." name="search" onChange={this.handleInput} />
            <button type="submit" onClick={this.findStock}/>
            </form>
        )
    }
}

export default SearchPage;