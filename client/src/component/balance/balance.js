import React, {Component} from 'react'
import BalanceCard from "./quickcards"
import axios from 'axios'

class Balance extends Component{
    constructor(props){
        super(props)
        this.state={
            balance:'$0'
        }
    }

    async componentDidMount(){
        const config ={ 
            method: 'get',
            url: 'http://localhost:8080/balance/50'
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