const models = require('../models/index')
const transactionModel=models.transaction

let write=async function registerTransaction(receipt,transaction){
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
}

module.exports=functions