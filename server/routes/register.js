const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

/*
    The function takes in a password as
    a param. The password is then hashed 
    using bcrypt and then returned the hashed
    password
*/
function createHash(pw){

}

function insertUser(newUser){
    newUser.save()
        .then(()=>{
            return "Success, your account has been created"
        })
        .catch((err)=>{
            return "This account could not be created or already exists"
        })
}

async function validate(newUser){
    try{
        let err = await newUser.validate()
        console.log('error ',err)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}

/*
    The function takes in a user object and the
    user model then it will run validation on it.
    If the data is valid it is inserted into the 
    database
*/
async function createUser(user,userModel){
        //create a userModel object with the values
        let newUser=await userModel.build(user)
        //validate the values of the new user
        let valid = await validate(newUser)

        if(valid===true){
            let result=insertUser(newUser,userModel)
            res.status(200).send(result)
        }
        else{
            res.status(400).send("The account could not be created")
        }
}

module.exports=function(app,userModel){

    //register a user route
    app.post("/register",async function (req,res){
        let user = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password
        }

        createUser(user,userModel)

        res.status(200).send({msg:user})
    })
}