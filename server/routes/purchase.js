const balanceModel= require('../utils/balanceUtils')
const stockModel = require('../utils/stockUtils')
const transactionModel = require('../utils/transactionUtils')
const model = require ('../models/index')
const sequelize = model.sequelize

/*
    This function will ensure the value passed 
    as the amount the user wants to purchase is 
    greater than 0 and is in fact a number value
*/
function validNumber(amount){
    console.log('amount ',amount)
    if(typeof(amount)!=="number" || amount<0){
        throw "Invalid amount"
    }
    return true
}

async function makePurchase(request){
    let transaction;    
    let totalCost = request.costPerShare*request.qty
    try{
        // create a transaction
        console.log('here')
        transaction = await sequelize.transaction();

        // update the user's balance
        await balanceModel.updateBalance(request.id,totalCost,transaction);

        // assign the stock to the user
        let stock={
            ticker:request.ticker,
            shares:request.qty,
            total:totalCost
        }
        await stockModel.add(stock,request.id,transaction)

        // register the transaction to the user
        let receipt={
            UserId:request.id,
            type:'BUY',
            date:new Date(),
            ticker:request.ticker,
            shares:request.qty,
            cost:request.costPerShare,
            total:totalCost
        }
        await transactionModel.write(receipt,transaction);

        // Nothing failed, commit the transaction
        await transaction.commit();

    }catch (err){
        // Transaction failed to complete
        console.log('tranaction errrr ',err)
        await transaction.rollback();
        throw 'Failed To Complete Purchase Please Try Again'
    }
}

module.exports=function(app){
    
    //make purchases 
    app.put("/purchase",async function (req,res){
        let transaction = {
            id:req.body.id,
            costPerShare:req.body.costPerShare,
            ticker:req.body.ticker,
            qty:req.body.qty,
        }

        try{
            let validCost=await validNumber(transaction.costPerShare)
            let validQty=await validNumber(transaction.qty)
            console.log('Valid cost ',validCost)
            console.log('Valid qty ',validQty)
            let purchaseComplete= await makePurchase(transaction)
            res.status(200).send({msg:"Purchase Complete"})
        }catch(err){
            console.log(err)
            res.status(400).send({Error:err})
        }
    })
}