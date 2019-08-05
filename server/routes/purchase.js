const balanceModel= require('../utils/balanceUtils')
const stockModel = require('../utils/stockUtils')
const transactionModel = require('../utils/transactionUtils')
const model = require ('../models/index')
const validate = require('../utils/validate')
const sequelize = model.sequelize



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
            let validCost=await validate.validateMoney(transaction.costPerShare)
            let validQty=await validate.validateQty(transaction.qty)
            let purchaseComplete= await makePurchase(transaction)
            res.status(200).send({msg:"Purchase Complete"})
        }catch(err){
            console.log(err)
            res.status(400).send({Error:err})
        }
    })
}