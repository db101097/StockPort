const models = require('../models/index')
const transactionModel=models.transaction

let getAllTransactions=async (userId)=>{
    try{
        let transaction=await transactionModel.findAll({where:{UserId:userId}})
        if(transaction===null){
            throw 'Transactions Not Found'
        }
        return transaction
    }catch(err){
        throw 'Transactions Not Found'
    }

}

let write=async (receipt,transaction)=>{
    try{
        let makeTransaction=await transactionModel.build(receipt)
        let complete=await makeTransaction.save({transaction:transaction})
    }catch(err){
        console.log(err)
        throw 'Failed to Register The Transaction'
    }
}


let functions = {
    write:write,
    getAll:getAllTransactions
}

module.exports=functions