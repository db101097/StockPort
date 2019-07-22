import React, { Component } from 'react';
import validate from 'validator';


    function error(msg){
        return {
            error:true,
            msg:msg
        }
    }

    function valid(){
        return {
            error:"",
            msg:""
        }
    }

    function validateName(name){
        if(typeof(name)==="string"&&name.length>0){
            return valid()
        }
        else{
            return error('Name Is Not Valid')
        }
    }

    function validateEmail(email){
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)===false){
            return error('Email Is Not Valid')
        }
        else{
            return valid()
        }
    }

    function validatePassword(password){
        let regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(regex.test(password)===false){
            return error("Password Must Be 8 Characters Long , Include a Capital Letter , a Lowercase Letter And A Special Character")
        }
        else{
            return valid()
        }
    }

    export function validateForm (fieldName,field) {  
        switch(fieldName) {
            case "firstName":
                return validateName(field)
            case "lastName":
                return validateName(field)
            case "email":
                return validateEmail(field)
            case "password":
                return validatePassword(field)
            default:
                return valid()
        }
    }
