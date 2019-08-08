const models = require('../models/index')
const balanceModel=models.balance
/*
    This function takes in the user ID and the 
    model for user account balances. With the ID
    the function will query the database for a 
    matching user and their balance. If the query
    fails then the user's balance does not exist
    and an error is thrown. Otherwise the object 
    found is returned.
*/
let retrieveBalance=async (userID)=>{
    try{
        let total=await balanceModel.findOne({where:{UserId:userID}})
        //console.log('total ',total)
        if(total===null){
            throw 'Balance Unavailable'
        }
        return total
    }catch(err){
        console.log('ERROR in retrieve ',err)
        throw 'User not found'
    }
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
let update=async function updateBalance(id,amount,transaction){
    try{
        let currentBalance=await retrieveBalance(id,balanceModel)
        if(amount>currentBalance.amount){
            throw 'Purchase Amount Exceeds Balance'
        }
        else{
            currentBalance.amount=currentBalance.amount-amount
            let result=await currentBalance.save({transaction:transaction})
        }
    }catch(err){
        console.log(err)
        throw err
    }
}


let functions = {
    updateBalance:update,
    retrieveBalance:retrieveBalance
}

module.exports=functions