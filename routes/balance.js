/*
    This function takes in the user ID and the 
    model for user account balances. With the ID
    the function will query the database for a 
    matching user and their balance. If the query
    fails then the user's balance does not exist
    and an error is thrown. Otherwise the object 
    found is returned.
*/
async function retrieveBalance(userID,balanceModel){
    try{
        let total=await balanceModel.findOne({where:{UserId:userID}})
        console.log('total ',total)
        if(total===null){
            throw 'Balance Unavailable'
        }
        return total
    }catch(err){
        throw 'User not found'
    }
}

/*
    This function will ensure the value passed 
    as the amount the user wants to purchase is 
    greater than 0 and is in fact a number value
*/
function validNumber(amount){
    if(typeof(amount)!=="number" || amount<0){
        throw "Invalid amount"
    }

    return true
}

/*
    This function take in a transaction object.
    This object contains the id of the user and 
    the amount of the purchase. The retrieveBalance
    function will return a sequelize balance object 
    and that object will be updated with the new total
    if there is enough money to cover the purchase. If not
    then an error is thrown
*/
async function updateBalance(transaction,balanceModel){
    try{
        let currentBalance=await retrieveBalance(transaction.id,balanceModel)
        if(transaction.amount>currentBalance.amount){
            throw 'Purchase Amount Exceeds'
        }
        else{
            currentBalance.amount=currentBalance.amount-transaction.amount
            let result=await currentBalance.save()
        }
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports=function(app,balanceModel){

    app.get("/balance/:id",async function (req,res){
        let id=req.params.id
        try{
            let total=await retrieveBalance(id,balanceModel)
            res.status(200).send({Balance:total.amount})
        }catch(err){
            console.log(err)
            res.status(404).send({Error:"User Could Not Be Found Or Balance Unavailable"})
        }       
    })

    app.put("/purchase",async function (req,res){
        let transaction = {
            id:req.body.id,
            amount:req.body.amount
        }

        try{
            let valid=await validNumber(transaction.amount)
            console.log(valid)
            let purchaseComplete= await updateBalance(transaction,balanceModel)
            res.status(200).send({msg:"Purchase Complete"})
        }catch(err){
            console.log(err)
            res.status(400).send({Error:err})
        }
    })
}