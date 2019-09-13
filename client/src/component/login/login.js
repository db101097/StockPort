import React, { Component } from 'react';
import Form from './loginForm';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router'

class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            authorized:false,
            error:"",
            noAccount:false
        }

        this.handleInput= this.handleInput.bind(this)
    }

    handleInput= (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    submit = async (e)=>{
        e.preventDefault();
        const config ={ 
            method: 'post',
            url: 'https://stockportapp.herokuapp.com/login',
            data: {
                email:this.state.email,
                password:this.state.password,
            }
        }

        try{
            let res=await axios(config)
            cookie.save('token',res.data.token)
            cookie.save('user',res.data.userID)
            this.setState({authorized:true})
            console.log(res)
        }catch(err){
            console.log(err)
            this.setState({error:"Info not valid"})
        }
    }

    render(){
        
        if(this.state.authorized===true){
            return(
                <Redirect to ="/buy"> </Redirect>
            )
        }

        else{
            return(
                <Form submitHandler={this.submit} handleInput={this.handleInput} error={this.state.error} />
            )
        }
    }
}

export default login;