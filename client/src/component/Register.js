import React, { Component } from 'react';


class Register extends Component{
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                 Name:
                <br/>
                <input type="text" />
                <br/>
                Email:
                <br/>
                <input type="text" />
                <br/>
                Password:
                <br/>
                <input type="password" />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Register;
