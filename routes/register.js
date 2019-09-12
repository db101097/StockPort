const bcrypt = require('bcrypt')
const saltRounds = 12;

/*
    The function takes in a password as
    a param. The password is then hashed 
    using bcrypt and then returned the hashed
    password
*/
async function createHash(password){
        try{
            let hash= await bcrypt.hash(password,saltRounds)
            return hash
        }catch(err){
            throw "Password cannot be hashed"
        }
}

/*
    This function will take the validated user
    object and then call the save function which will 
    have the data persist in the database.
*/
async function insertUser(newUser,balanceModel){
    try{
        let result= await newUser.save()
        if(result!=null){
            let newUserBalance= await balanceModel.build({UserId:result.id,amount:5000.00})
            let result2= await newUserBalance.save()
        }
        return "Success, your account has been created"
    }catch(err){
        console.log(err)
        throw "Insert Failed"
    }
}

/*
    This function takes the user object created
    it then runs the validators on it and return
    true if it passes the tests or false if errors
    exists
*/
async function validate(newUser){
    try{
        let result = await newUser.validate()
        return true
    }
    catch(err){
        console.log('errrrr',err)
        throw "Failed Validation"
    }
}

/*
    The function takes in a user object and the
    user model then it will run validation on it.
    If the data is valid , then the password will
    be hashed. Finally the the save() function is used
    on the object to persist it to the database
*/
async function createUser(user,userModel,balanceModel){

        try{
            //create a userModel object with the values
            let newUser=await userModel.build(user)
            //validate the values of the new user
            let valid = await validate(newUser)
            if(valid===true){
                let hashedPassword=await createHash(newUser.password)
                newUser.password=hashedPassword
                let result=await insertUser(newUser,balanceModel)
                console.log('result',result)
                return "Success, Your Account Has Been Created"
            }
        }catch(err){
            console.log('errorrr',err)
            throw err
        }
}

module.exports=function(app,userModel,balanceModel){

    app.post("/register",async function (req,res){
        let user = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password
        }
        try{
            let result=await createUser(user,userModel,balanceModel)
            res.status(200).send({msg:result})
        }catch(err){
            res.status(400).send({Error:"The Account Could Not Be Created or Already Exists"})
        }
        
    })
}