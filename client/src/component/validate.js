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
            error:false,
            msg:""
        }
    }

    function validateName(name){
        if(typeof(name)==="string"&&name.length>0){
            return valid()
        }
        else{
            return error('Name is invalid')
        }
    }

    function validateEmail(email){
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)===false){
            return error('Email is invalid')
        }
        else{
            return valid()
        }
    }

    function validatePassword(password){
        let regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(regex.test(password)===false){
            return error("Password does not meet criteria")
        }
        else{
            return valid()
        }
    }

    function validateConfirmPassword(password,confirmPassword){
        if(password!==confirmPassword){
            console.log('password function')
            return error("Passwords do not match")
        }
        else{
            return valid()
        }
    }

    export function validateForm (fieldName,field) {  
        switch(fieldName) {
            case "firstName":
                return validateName(field)
                break;
            case "lastName":
                return validateName(field)
                break;
            case "email":
                return validateEmail(field)
                break;
            case "password":
                return validatePassword(field)
                break;
            case "confirmPassword":
                return validateConfirmPassword(field)
                break;
            default:
                return valid()
        }
    }
