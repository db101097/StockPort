import React, {Component} from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import Buy from "./stock/buy"
import HomeBase from "./homeBase"
import Transaction from "./transactions/transactions"
import Portfolio from './portfolio/portfolio'

class auth extends Component{
    constructor(props){
        super(props)
        this.state={
            authorized:'loading'
        }
    }

    async componentDidMount(){

        if(cookie.load('token')===undefined){
            this.setState({authorized:'Not authorized'})
        }
        console.log(cookie.load('token'))
        const config ={ 
            method: 'get',
            url: 'https://stockportapp.herokuapp.com/auth/',
            headers: {
                Authorization: "Bearer " + cookie.load('token')
            }
        }

        try{
            let res=await axios(config)
            this.setState({authorized:'authorized'})
        }catch(err){
            console.log(err)
            this.setState({authorized:'Not authorized'})
        }
    }

    render(){
        if(this.state.authorized==='loading'){
            return (
                <h1>
                    Loading
                </h1>
            )
        }

        else if(this.state.authorized==='Not authorized'){
            return (
                <div>
                    {this.props.login}
                </div>
            )
        }

        else{
            return (
                <div>
                {this.props.component}
                </div>
            )
        }
    }
}

export default auth;