const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

/*

*/
async function issueToken(user){
    let token = await jwt.sign({
        name: user.firstName,
        id: user.id
    }, "mykey", {expiresIn: "3 hours"});
    console.log(token);
    return token
}

/*

*/
async function authenticate(password,hash){
    try{
        let result= await bcrypt.compare(password,hash)
        if(result===true){
            return true
        }
        else{
            return false
        }
    }catch{
        return false
    }

  
}

/*

*/
async function findUser(form,userModel){
    console.log('here')
    try{
        let user=await userModel.findOne({where:{email:form.email}})
        console.log('query ', user)
        if(user!==null){
            let authenticated= await authenticate(form.password,user.password);
            console.log('authenticated',authenticated)
            if(authenticated===false){
                console.log('Did not authenticate')
                return false
            }
            else{
                console.log('Token issued')
                return issueToken(user)
            }
        }
        else{
            throw "The Account Does Not Exist"
        }
    }catch(err){
        console.log('error',err)
        throw err
    }

}

module.exports=function(app,userModel){

    //register a user route
    app.post("/login",async function (req,res){
        let form={
            email:req.body.email,
            password:req.body.password
        }
        try{
            let result= await findUser(form,userModel)
            if(result===false){
                throw 'Invalid Email Password Combination'
            }
            console.log('returning ',result)
            res.status(200).send({token:result})
        }catch(err){
            console.log('result error',err)
            res.status(400).send(err)
        }
    })
}