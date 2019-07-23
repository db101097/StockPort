import React, { Component } from 'react';
import Form from './loginForm';
import axios from 'axios';


class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            invalid:false,
            error:""
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
    
        let res = await axios(config)
        console.log(res)
        return res;

    }

    render(){
        return(
            <Form submitHandler={this.submit} handleInput={this.handleInput}/>
        )
    }
}

export default login;