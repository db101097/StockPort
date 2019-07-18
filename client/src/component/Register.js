import React, { Component } from 'react';
import {validateForm} from './validate';
import '../styles/Register.css';

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
    }

    handleInput= (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
    }


    render(){
        if(this.state.invalid===true){
            console.log('error render')
            return (
                <form>
                    <label>
                    First Name:
                    <br/>
                    <input type="text" className={this.state.error["firstName"].error ? "error" : ""} name="firstName" required onChange={this.handleInput}/>
                    <br/>
                    <div class="error">{this.state.error["firstName"].error ? this.state.error["firstName"].msg : ""}</div>
                    Last Name:
                    <br/>
                    <input type="text" name="lastName" className={this.state.error["lastName"].error ? "error" : ""} required onChange={this.handleInput}/>
                    <div class="error">{this.state.error["lastName"].error ? this.state.error["lastName"].msg : ""}</div>
                    Email:
                    <br/>
                    <input type="email" name="email" className={this.state.error["email"].error ? "error" : ""}  required onChange={this.handleInput}/>
                    <div class="error">{this.state.error["email"].error ? this.state.error["email"].msg : ""}</div>
                    Password:
                    <br/>
                    <input type="password" name="password" className={this.state.error["password"].error ? "error" : ""} required onChange={this.handleInput}/>
                    <div class="error">{this.state.error["password"].error ? this.state.error["password"].msg : ""}</div>
                    Confirm Password:
                    <br/>
                    <input type="password" name="confirmPassword" className={this.state.error["confirmPassword"].error ? "error" : ""}  required onChange={this.handleInput}/>
                    <div class="error">{this.state.error["confirmPassword"].error ? this.state.error["confirmPassword"].msg : ""}</div>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" required onClick={this.submit}/>
                </form>
            )
        }
        else{
            return(
                    <form>
                    <label>
                    First Name:
                    <br/>
                    <input type="text" name="firstName" required onChange={this.handleInput}/>
                    <br/>
                    Last Name:
                    <br/>
                    <input type="text" name="lastName" required onChange={this.handleInput}/>
                    <br/>
                    Email:
                    <br/>
                    <input type="email" name="email" required onChange={this.handleInput}/>
                    <br/>
                    Password:
                    <br/>
                    <input type="password" name="password" required onChange={this.handleInput}/>
                    <br/>
                    Confirm Password:
                    <br/>
                    <input type="password" name="confirmPassword" required onChange={this.handleInput}/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" required onClick={this.submit}/>
                    </form>
            )

    }
}

}

export default Register;
