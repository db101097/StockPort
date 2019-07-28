import React, {Component} from 'react'
import BalancePaper from "./paper"

class Balance extends Component{
    constructor(props){
        super(props)
        this.state={
            balance:0
        }
    }

    render(){
        return (
            <BalancePaper title={"Balance"} info={this.state.balance} />
        )
    }
}

export default Balance;