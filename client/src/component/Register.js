import React, { Component } from 'react';


class Register extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            valid:false
        }

        this.handleInput= this.handleInput.bind(this)
        this.validate=this.validate.bind(this)
    }

    validate = ()=> {
        
    }

    handleInput= (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submit = (e)=>{
        e.preventDefault();
        console.log("firstname",this.state.firstName)
        console.log("lastname",this.state.lastName)
        console.log("email",this.state.email)
        console.log("password",this.state.password)
        console.log("confirm password",this.state.confirmPassword)
    }


    render(){
        return (
            <form>
                <label>
                 First Name:
                <br/>
                <input type="text" name="firstName" onChange={this.handleInput}/>
                <br/>
                 Last Name:
                <br/>
                <input type="text" name="lastName" onChange={this.handleInput}/>
                <br/>
                Email:
                <br/>
                <input type="text" name="email" onChange={this.handleInput}/>
                <br/>
                Password:
                <br/>
                <input type="password" name="password" onChange={this.handleInput}/>
                <br/>
                Confirm Password:
                <br/>
                <input type="password" name="confirmPassword" onChange={this.handleInput}/>
                </label>
                <br/>
                <input type="submit" value="Submit" onClick={this.submit}/>
            </form>
        )
    }
}

export default Register;
