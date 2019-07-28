import React, { Component } from 'react';
import Form from './loginForm';
import axios from 'axios';
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
            url: 'http://localhost:8080/login',
            data: {
                email:this.state.email,
                password:this.state.password,
            }
        }

        try{
            let res=await axios(config)
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
                <Redirect to ="/home"> </Redirect>
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