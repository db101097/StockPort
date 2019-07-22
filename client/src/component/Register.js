import React, { Component } from 'react';
import {validateForm} from './validate';
import '../styles/Register.css';
import axios from 'axios'
import Register2 from './Register2.0'

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
            error:""
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
    
        let res = await axios(config)
        console.log(res.data.msg)
        return res;
    }

    submit = async (e)=>{
        e.preventDefault();
        let err = new Map();
        let invalid=false;
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
        this.setState({error:err,invalid})
        if(this.state.invalid===false){
            let result=await this.registerUser()
            alert(result.data.msg)
        }

    }


    render(){
        if(this.state.invalid===true){
            console.log('error render')
            return (
                <Register2 submitHandler={this.submit} handleInput={this.handleInput} errors={this.state.error}/>
            )
        }
        else{
            return(
                <Register2 submitHandler={this.submit} handleInput={this.handleInput} errors={this.state.error}/>
            )

    }
}

}

export default Register;
