const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

/*
    The function takes in a password as
    a param. The password is then hashed 
    using bcrypt and then returned the hashed
    password
*/
function createHash(pw){

}

/*
    The function takes in an email as a param.
    It will query the database using the email 
    to assure that the user does not already exist 
    within the database. It will return true if the user 
    exists and false if the user does not exist.
*/
function userExist(email){

}

/*
    The function takes in a form object then
    it will use the validatejs library to validate
    the data to make sure no bad data is able to make
    it to the database.
*/
function validate(form){

}

module.exports=function(user,app){

    app.get("/register",async function (req,res){
          
    })
}