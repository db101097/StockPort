import React, {Component} from 'react'
import BalanceCard from "./quickcards"
import axios from 'axios'
import cookie from 'react-cookies';

class Balance extends Component{
    constructor(props){
        super(props)
        this.state={
            balance:'$0'
        }
    }

    async componentDidMount(){
        console.log(cookie.load('token'))
        const config ={ 
            method: 'get',
            url: 'https://stockportapp.herokuapp.com/balance/'+cookie.load('user'),
            headers: {
                Authorization: "Bearer " + cookie.load('token')
            }
        }

        try{
            let res=await axios(config)
            this.setState({balance:'$'+res.data.Balance})
            console.log(res.data.Balance)
        }catch(err){
            console.log(err)
            this.setState({error:"Info not valid"})
        }
    }

    render(){
        return (
            <BalanceCard title={"Balance"} info={this.state.balance} />
        )
    }
}

export default Balance;