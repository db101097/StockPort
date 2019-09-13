import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router'

class logout extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedOut:false
        }
    }

    componentDidMount(){
        cookie.remove('token')
        cookie.remove('user')
        this.setState({loggedOut:true})
    }


    render(){
        console.log('logged out ',this.state.loggedOut)
        if(this.state.loggedOut===true){
            return(
                <Redirect to ="/login"> </Redirect>
            )
        }

        else{
            return (
                <h1>
                   Logging Out
                </h1>
            )
        }

    }
}

export default logout;