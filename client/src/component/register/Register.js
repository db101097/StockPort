import React, { Component } from 'react';
import {validateForm} from './validate';
import axios from 'axios'
import Form from './registerForm'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'
import Alert from './Alert'

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            invalid:false,
            error:"",
            redirect:false,
            failed:false
        }

        this.handleInput= this.handleInput.bind(this)
        this.registerUser = this.registerUser.bind(this)
    }


    handleInput= (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


     registerUser= async ()=>{

        const config ={ 
            method: 'post',
            url: 'http://localhost:8080/register',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email:this.state.email,
                password:this.state.password,
                confirmPassword:this.state.confirmPassword
            }
        }
        try{
            let res = await axios(config)
            console.log(res.data.msg)
            return res;
        }catch(err){
            throw err
        }
    }

    submit = async (e)=>{
        e.preventDefault();
        let err = new Map();
        let invalid=false;
        this.setState({failed:false})
        const keys = Object.keys(this.state)
        for (const key of keys) {
            if(key!=="error" || key!=="count"){
                let result=await validateForm(key,this.state[key])
                err[key]=result
                if(result.error===true){
                    invalid=true
                }
            }
        }
        console.log(err)
        //this.setState({error:err,invalid})
        if(invalid===false){
            try{
                let result=await this.registerUser()
                this.setState({redirect:true})
            }catch(err){
                console.log(err)
                this.setState({failed:true})
            }
        }
        else{
            this.setState({error:err,invalid})
        }

    }


    render(){
        if(this.state.redirect===true){
            return (
                <Redirect to ="/Login"> </Redirect>
            )
        }
        else if(this.state.failed===true){
            return(
                <div>
                    <Alert open={true}/>
                    <Form submitHandler={this.submit} handleInput={this.handleInput} errors={this.state.error}/>
                 </div>
            )  
        }
        else if(this.state.invalid===true){
            console.log('error render')
            return (
                <div>
                    <Form submitHandler={this.submit} handleInput={this.handleInput} errors={this.state.error}/>
                </div>
            )
        }
        else{
            console.log('Regular form')
            return(
                <Form submitHandler={this.submit} handleInput={this.handleInput} errors={this.state.error}/>
            )
        }
}

}

export default Register;
